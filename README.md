# Controle de Estoque - Aplicação Backend

Este repositório contém o código-fonte de uma aplicação de controle de estoque, em javascript.
O objetivo principal do projeto foi aperfeiçoar e aprender mais sobre uma aplicação nodeJs.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instruções de Uso](#instruções-de-uso)
- [Configuração do Ambiente](#configuração-do-ambiente)

## Tecnologias Utilizadas

- Node.js
- Express.js
- Docker

## Funcionalidades

A aplicação oferece as seguintes funcionalidades:

- CRUD de Produtos
- CRUD de Clientes
- CRUD de Pedidos
- Controle de Estoque

## Instruções de Uso

Para executar a aplicação, siga as etapas abaixo:

1. **Clone o Repositório**: Clone este repositório para a sua máquina local.

   ```bash
   git clone https://github.com/ZanellaIgor/Controle_Estoque_NodeJS_CRUDs.git
   cd controle-estoque-backend
   ```

2. **Instale as Dependências**: Execute `npm install` ou `yarn` para instalar todas as dependências necessárias.

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Configure as Variáveis de Ambiente**: Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias. Um exemplo de arquivo `.env.example` pode ser fornecido no repositório.

4. **Suba o Projeto Docker**: Inicie uma instância do banco de dados no Docker, conforme exemplo disponibilizado no arquivo `docker-compose.yml`.

   ```bash
   docker-compose up -d
   ```

5. **Migração de Banco de Dados**: Para criar as tabelas, entre na pasta `seeds` e execute `node seeds.js`.

   ```bash
   cd seeds
   node seeds.js
   cd ..
   ```

6. **Construa o Projeto**: Use `npm run build` ou `yarn build` para compilar o projeto.

   ```bash
   npm run build
   # ou
   yarn build
   ```

7. **Inicie o Servidor de Desenvolvimento**: Execute `npm run dev` ou `yarn dev` para iniciar o servidor de desenvolvimento usando nodemon.

   ```bash
   npm run dev
   # ou
   yarn de


   ```
