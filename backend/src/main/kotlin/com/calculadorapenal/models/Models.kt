package com.calculadorapenal.models

import kotlinx.serialization.Serializable

// ── Enums ────────────────────────────────────────────────

@Serializable
enum class TipoCrime {
    COMUM,                          // 16% primário / 20% reincidente
    COMUM_VIOLENCIA_GRAVE_AMEACA,   // 25% primário / 30% reincidente
    HEDIONDO,                       // 40% primário / 60% reincidente
    HEDIONDO_RESULTADO_MORTE        // 50% primário / 70% reincidente — LC vedado
}

@Serializable
enum class StatusApenado {
    PRIMARIO,
    REINCIDENTE
}

// ── Request ──────────────────────────────────────────────

@Serializable
data class CalculoRequest(
    val penaAnos: Int,
    val penaMeses: Int,
    val penaDias: Int,
    val dataInicioCumprimento: String,   // formato: "yyyy-MM-dd"
    val detracaoDias: Int = 0,
    val tipoCrime: TipoCrime,
    val statusApenado: StatusApenado
)

@Serializable
data class ContatoRequest(
    val nomeCompleto: String,
    val whatsapp: String,
    val email: String? = null,
    val numeroProcesso: String? = null   // formato: NNNNNNN-DD.AAAA.J.TR.OOOO
)

// ── Response ─────────────────────────────────────────────

@Serializable
data class CalculoResponse(
    val dataProgressaoSemiaberto: String,
    val dataProgressaoAberto: String,
    val dataLivramentoCondicional: String?,
    val livramentoCondicionalVedado: Boolean,
    val motivoVedacao: String? = null,
    val penaTotalDias: Int,
    val penaTotalEfetivaDias: Int,
    val dataPrevistaTerminoPena: String,
    val fracaoProgressao: String,
    val fracaoLivramentoCondicional: String?,
    val baseLegal: List<String>
)

@Serializable
data class ContatoResponse(
    val sucesso: Boolean = true,
    val mensagem: String = "Contato registrado. Em breve nossa equipe entrará em contato pelo WhatsApp informado."
)

@Serializable
data class StatusResponse(
    val status: String = "OK",
    val versao: String = "1.0.0"
)

@Serializable
data class ErrorResponse(
    val erro: String,
    val detalhes: List<String> = emptyList()
)
