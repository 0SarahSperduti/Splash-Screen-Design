package com.calculadorapenal.services

import com.calculadorapenal.models.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import kotlin.math.roundToInt

/**
 * Motor de cálculo da execução penal.
 *
 * Referências legais:
 *  - Art. 112 da Lei nº 7.210/1984 (LEP)
 *  - Lei nº 13.964/2019 (Pacote Anticrime)
 *  - Art. 83 do Código Penal (Livramento Condicional)
 *  - Lei nº 8.072/1990 (Crimes Hediondos)
 */
object CalculoPenalService {

    private val INPUT_FMT  = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    private val OUTPUT_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy")

    // ────────────────────────────────────────────────────
    // Frações de progressão — art. 112 LEP + Pacote Anticrime
    // ────────────────────────────────────────────────────

    private fun fracaoProgressao(tipo: TipoCrime, status: StatusApenado): Double = when (tipo) {
        TipoCrime.COMUM -> if (status == StatusApenado.PRIMARIO) 0.16 else 0.20
        TipoCrime.COMUM_VIOLENCIA_GRAVE_AMEACA -> if (status == StatusApenado.PRIMARIO) 0.25 else 0.30
        TipoCrime.HEDIONDO -> if (status == StatusApenado.PRIMARIO) 0.40 else 0.60
        TipoCrime.HEDIONDO_RESULTADO_MORTE -> if (status == StatusApenado.PRIMARIO) 0.50 else 0.70
    }

    // ────────────────────────────────────────────────────
    // Frações de Livramento Condicional — art. 83 CP
    // null = VEDADO (hediondo com resultado morte)
    // ────────────────────────────────────────────────────

    private fun fracaoLC(tipo: TipoCrime, status: StatusApenado): Double? = when (tipo) {
        TipoCrime.COMUM,
        TipoCrime.COMUM_VIOLENCIA_GRAVE_AMEACA -> if (status == StatusApenado.PRIMARIO) 1.0 / 3.0 else 0.5
        TipoCrime.HEDIONDO -> 2.0 / 3.0
        TipoCrime.HEDIONDO_RESULTADO_MORTE -> null   // VEDADO
    }

    // ────────────────────────────────────────────────────
    // Cálculo principal
    // ────────────────────────────────────────────────────

    fun calcular(req: CalculoRequest): CalculoResponse {
        validar(req)

        val icp           = LocalDate.parse(req.dataInicioCumprimento, INPUT_FMT)
        val penaTotalDias = (req.penaAnos * 365) + (req.penaMeses * 30) + req.penaDias
        val penaEfetiva   = (penaTotalDias - req.detracaoDias).coerceAtLeast(1)
        val frac          = fracaoProgressao(req.tipoCrime, req.statusApenado)

        // Progressão fechado → semiaberto: fração sobre pena efetiva
        val diasSemiaberto = (penaEfetiva * frac).roundToInt()

        // Progressão semiaberto → aberto: mesma fração sobre o restante
        val diasAberto = diasSemiaberto + ((penaEfetiva - diasSemiaberto) * frac).roundToInt()

        val dataSemiaberto = icp.plusDays(diasSemiaberto.toLong())
        val dataAberto     = icp.plusDays(diasAberto.toLong())
        val dataTCP        = icp.plusDays(penaEfetiva.toLong())

        // Livramento Condicional
        val fLC    = fracaoLC(req.tipoCrime, req.statusApenado)
        val dataLC = fLC?.let { icp.plusDays((penaEfetiva * it).roundToInt().toLong()) }
        val vedado = fLC == null

        return CalculoResponse(
            dataProgressaoSemiaberto       = dataSemiaberto.format(OUTPUT_FMT),
            dataProgressaoAberto           = dataAberto.format(OUTPUT_FMT),
            dataLivramentoCondicional      = dataLC?.format(OUTPUT_FMT),
            livramentoCondicionalVedado    = vedado,
            motivoVedacao                  = if (vedado)
                "Crime hediondo com resultado morte — LC vedado (art. 83, §único, CP)." else null,
            penaTotalDias                  = penaTotalDias,
            penaTotalEfetivaDias           = penaEfetiva,
            dataPrevistaTerminoPena        = dataTCP.format(OUTPUT_FMT),
            fracaoProgressao               = "${(frac * 100).roundToInt()}%",
            fracaoLivramentoCondicional    = fLC?.let { fracaoTexto(it) },
            baseLegal                      = baseLegal(req.tipoCrime, req.statusApenado)
        )
    }

    // ────────────────────────────────────────────────────
    // Helpers
    // ────────────────────────────────────────────────────

    private fun validar(req: CalculoRequest) {
        val erros = mutableListOf<String>()
        val totalDias = (req.penaAnos * 365) + (req.penaMeses * 30) + req.penaDias

        if (totalDias <= 0)         erros.add("A pena total deve ser maior que zero.")
        if (req.penaAnos < 0)       erros.add("Anos não pode ser negativo.")
        if (req.penaMeses !in 0..11) erros.add("Meses deve estar entre 0 e 11.")
        if (req.penaDias !in 0..29) erros.add("Dias deve estar entre 0 e 29.")
        if (req.detracaoDias < 0)   erros.add("Detração não pode ser negativa.")
        if (req.detracaoDias >= totalDias) erros.add("Detração não pode ser maior ou igual à pena total.")

        try { LocalDate.parse(req.dataInicioCumprimento, INPUT_FMT) }
        catch (e: Exception) { erros.add("Data inválida. Use o formato yyyy-MM-dd.") }

        if (erros.isNotEmpty()) throw IllegalArgumentException(erros.joinToString("; "))
    }

    private fun fracaoTexto(v: Double) = when {
        v == 1.0 / 3.0 -> "1/3"
        v == 0.5        -> "1/2"
        v == 2.0 / 3.0 -> "2/3"
        else            -> "${(v * 100).roundToInt()}%"
    }

    private fun baseLegal(tipo: TipoCrime, status: StatusApenado): List<String> {
        val lista = mutableListOf(
            "Art. 112 da Lei nº 7.210/1984 (LEP) — Progressão de regime.",
            "Lei nº 13.964/2019 (Pacote Anticrime) — Frações de progressão."
        )
        when (tipo) {
            TipoCrime.HEDIONDO, TipoCrime.HEDIONDO_RESULTADO_MORTE ->
                lista.add("Lei nº 8.072/1990 — Crimes Hediondos.")
            else -> {}
        }
        when {
            tipo == TipoCrime.HEDIONDO_RESULTADO_MORTE ->
                lista.add("LC vedado — art. 83, §único, CP.")
            tipo == TipoCrime.HEDIONDO ->
                lista.add("LC após 2/3 da pena — art. 83, V, CP.")
            status == StatusApenado.PRIMARIO ->
                lista.add("LC após 1/3 da pena — art. 83, I, CP.")
            else ->
                lista.add("LC após 1/2 da pena — art. 83, II, CP (reincidente).")
        }
        return lista
    }
}
