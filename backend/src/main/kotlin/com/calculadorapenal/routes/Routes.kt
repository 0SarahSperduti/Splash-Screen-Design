package com.calculadorapenal.routes

import com.calculadorapenal.models.*
import com.calculadorapenal.services.CalculoPenalService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRoutes() {
    routing {

        // GET /api/status — health check
        get("/api/status") {
            call.respond(StatusResponse())
        }

        // POST /api/calcular — cálculo principal
        post("/api/calcular") {
            val req = call.receive<CalculoRequest>()
            val resultado = CalculoPenalService.calcular(req)
            call.respond(HttpStatusCode.OK, resultado)
        }

        // POST /api/contato — captação de lead para o escritório
        post("/api/contato") {
            val req = call.receive<ContatoRequest>()

            val erros = mutableListOf<String>()
            if (req.nomeCompleto.isBlank()) erros.add("Nome completo é obrigatório.")
            if (req.whatsapp.isBlank())     erros.add("WhatsApp é obrigatório.")

            if (erros.isNotEmpty()) {
                call.respond(
                    HttpStatusCode.BadRequest,
                    ErrorResponse("Dados inválidos.", erros)
                )
                return@post
            }

            // Sem banco: só confirma o recebimento
            // (em produção: salvar em DB ou enviar via e-mail/webhook)
            call.respond(HttpStatusCode.Created, ContatoResponse())
        }
    }
}
