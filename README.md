# Calculadora Penal Jurídica

Aplicativo desenvolvido para automatizar o cálculo de benefícios da execução penal brasileira, permitindo determinar datas importantes como progressão de regime, livramento condicional e remição de pena de forma rápida, intuitiva e acessível.

O projeto possui caráter social e jurídico, auxiliando familiares de apenados, cidadãos leigos e escritórios de advocacia na compreensão das regras da execução penal previstas na legislação brasileira.

---
# Equipe

## Desenvolvimento
- Sarah Agostinho Sperduti - 25.00276-6
- Enzo Marangoni Freitas - 25.00383-1

## Orientação
- Prof. Dr. Aparecido Freitas

## Parceiro Jurídico
- Cepedes Lourenço Advogados

  
# Protótipo

Figma:  
https://quiet-skid-33335175.figma.site/

---

# Tecnologias Utilizadas

## Frontend
- React
- TypeScript
- TailwindCSS
- Vite

## Backend
- Kotlin
- API REST

## Ferramentas
- Git & GitHub
- Figma
- VS Code
- Android Studio

---

# Arquitetura do Sistema

O sistema foi desenvolvido utilizando arquitetura baseada em separação entre frontend e backend.

## Estrutura

### Frontend (Aplicativo)
Responsável pela interface visual e interação com o usuário.

Funções:
- Captura dos dados do apenado
- Exibição dos resultados
- Comunicação com a API
- Cadastro do usuário para contato jurídico

### Backend (Motor de Cálculo)
Responsável pelo processamento das regras jurídicas da execução penal.

Funções:
- Aplicação das regras legais
- Processamento dos cálculos penais
- Retorno das datas previstas dos benefícios
- Integração com serviços externos

---

# Fluxo do Sistema

1. O usuário informa os dados do apenado
2. O sistema envia os dados para o motor de cálculo
3. As regras jurídicas são processadas
4. O resultado é retornado ao aplicativo
5. O usuário visualiza:
   - Progressão de regime
   - Livramento condicional
   - Informações complementares
6. O sistema disponibiliza contato direto com o escritório jurídico

---

# Funcionalidades Principais

## Cadastro de Dados do Apenado
- Pena total
- Data de início do cumprimento
- Tempo de detração
- Tipo de crime
- Status do apenado
  - Primário
  - Reincidente

---

## Cálculos Automáticos
O sistema realiza automaticamente o cálculo de:

- Progressão para regime semiaberto
- Progressão para regime aberto
- Livramento condicional
- Remição de pena

---

## Captura de Dados do Usuário
Após o cálculo, o sistema permite o cadastro para contato jurídico:

- Nome completo
- WhatsApp
- E-mail
- Número do processo (opcional)

---

# Lógica de Cálculo

O motor de cálculo utiliza regras estruturadas no formato:

SE → ENTÃO (IF → THEN)

## Exemplos

- SE crime = comum E apenado = primário → progressão = 16%
- SE crime = comum E apenado = reincidente → progressão = 20%
- SE crime = hediondo E apenado = primário → progressão = 40%
- SE crime = hediondo E apenado = reincidente → progressão = 60%

---

# Critérios Legais Implementados

## Progressão de Regime

| Situação | Fração |
|---|---|
| Crime comum | 16% |
| Crime comum reincidente | 20% |
| Crime com violência ou grave ameaça | 25% |
| Violência ou grave ameaça reincidente | 30% |
| Crime hediondo | 40% |
| Crime hediondo reincidente | 60% |
| Crime hediondo com resultado morte | 50% |
| Crime hediondo com resultado morte reincidente | 70% |

---

## Remição de Pena

| Modalidade | Regra |
|---|---|
| Trabalho | 1 dia a cada 3 dias trabalhados |
| Estudo | 1 dia a cada 12 horas de estudo |
| Leitura | Até 4 dias por livro |

---

## Livramento Condicional

| Situação | Regra |
|---|---|
| Réu primário | 1/3 da pena |
| Réu reincidente | 1/2 da pena |
| Crime hediondo | 2/3 da pena |

---

# Infraestrutura

- Ambiente local para desenvolvimento
- Estrutura preparada para deploy em nuvem
- Possível hospedagem em:
  - AWS
  - Docker
  - VPS Linux

---

# Instalação e Execução

## Pré-requisitos

- Node.js instalado
- npm instalado
- Ambiente Kotlin configurado
- Git instalado

---

## Clone o repositório

```bash
git clone <url-do-repositorio>
```

---

## Frontend

### Instalar dependências

```bash
npm install
```

### Executar projeto

```bash
npm run dev
```

---

## Backend

Executar a API Kotlin conforme configuração local do projeto.

---

# Estrutura do Projeto

```bash
calculadora-penal/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── components/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── routes/
│
└── README.md
```

---

# Objetivo Social

O projeto busca democratizar o acesso à informação jurídica relacionada à execução penal, fornecendo uma ferramenta clara e acessível para pessoas que possuem dificuldade em compreender os cálculos previstos na legislação brasileira.

---

# Objetivo Técnico

Aplicar conceitos de:
- Arquitetura de software
- Desenvolvimento Full Stack
- APIs REST
- Lógica de programação
- Regras condicionais complexas
- UX/UI Design
- Integração entre sistemas

---

# Roadmap

Funcionalidades futuras planejadas:

- Sistema de login
- Histórico de cálculos
- Exportação em PDF
- Integração com tribunais
- Inteligência artificial jurídica
- Dashboard administrativo
- Versão Android nativa
- Deploy em nuvem

---

# Referências

- Lei nº 7.210/1984 — Lei de Execução Penal
- Lei nº 13.964/2019 — Pacote Anticrime
- Documentação Kotlin
- Documentação React
- Documentação Vite
- Calculadoras jurídicas brasileiras
- Materiais técnicos de execução penal
