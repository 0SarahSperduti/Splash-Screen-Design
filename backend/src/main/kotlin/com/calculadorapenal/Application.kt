package com.calculadorapenal

import com.calculadorapenal.models.ErrorResponse
import com.calculadorapenal.routes.configureRoutes
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import kotlinx.serialization.json.Json

fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {

    // Serialização JSON
    install(ContentNegotiation) {
        json(Json { prettyPrint = true; isLenient = true; ignoreUnknownKeys = true })
    }

    // CORS — permite chamadas do app Android e do front React
    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Options)
    }

    // Tratamento global de erros
    install(StatusPages) {
        exception<IllegalArgumentException> { call, cause ->
            call.respond(
                HttpStatusCode.BadRequest,
                ErrorResponse("Dados inválidos.", cause.message?.split("; ") ?: emptyList())
            )
        }
        exception<Throwable> { call, cause ->
            log.error("Erro interno: ${cause.message}")
            call.respond(HttpStatusCode.InternalServerError, ErrorResponse("Erro interno no servidor."))
        }
    }

    configureRoutes()

    log.info("API Calculadora Penal rodando em http://localhost:8080")
}
