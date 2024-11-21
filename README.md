# API Pokemon - LBD

## Artefatos

[Artefatos no Google Drive](https://drive.google.com/drive/folders/1iQzIFXbl0Qx93KjyLivXosRfO6f8-1mv?usp=sharing)

## Descrição

Esta API REST permite gerenciar Pokémons utilizando Node.js e TypeScript. Ela integra-se com a PokeAPI v2 para buscar dados de Pokémons e os armazena em um banco de dados utilizando Knex.js. A aplicação oferece rotas para buscar, inserir e gerenciar informações de Pokémons de forma eficiente.

## Funcionalidades

-   **Buscar Pokémon:** Rota `/pokemon/:name` que busca dados do Pokémon especificado na PokeAPI v2 e os salva no banco de dados.
-   **Gerar Pokémons:** Script `generate-pokemons` para inserir automaticamente um número especificado de Pokémons selecionados aleatoriamente da base de dados da PokeAPI.

## Tecnologias Utilizadas

-   **Backend:** Node.js, Express
-   **Linguagem:** TypeScript
-   **Banco de Dados:** SQLite3 (desenvolvimento), PostgreSQL (produção)
-   **ORM:** Knex.js
-   **Outros:** Axios, dotenv, ESLint, Prettier

## Como Rodar a Aplicação

### 1. Clone o Repositório

```bash
git clone https://github.com/jeuchaves/pokemon-api
cd pokemon-api-lbd
```

ou utilize o arquivo ZIP anexado no Drive

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

-   Copie o arquivo de exemplo .env.example para .env:

```bash
cp .env.example .env
```

-   Preencha as informações necessárias no arquivo .env, como configurações do banco de dados (DATABASE_HOST, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, etc.).

### 4. Execute a Aplicação

```bash
npm run start
```

A aplicação estará disponível em http://localhost:3333/.

## Scripts Disponíveis

```bash
# Iniciar a aplicação em modo de desenvolvimento
npm run start

# Compilar o código TypeScript
npm run build

# Executar o build da aplicação
npm run production

# Executar migrações do banco de dados
npm run knex:migrate

# Reverter todas as migrações
npm run knex:rollback-all

# Executar seeds no banco de dados
npm run knex:seed

# Gerar Pokémons automaticamente (exemplo: 20 Pokémons)
npm run generate-pokemons -- 20

# Lint com ESLint
npm run lint

# Formatar o código com Prettier
npm run format
```

## Gerar Build

Para criar a versão compilada da aplicação, execute:

```bash
npx tsc
```

Após a compilação, a pasta build será criada. Para iniciar a aplicação compilada, execute:

```bash
node ./build/index.js
```

## Autores

-   Jeú Chaves Lima - RGA: 2020.1906.027-0 - Engenharia de Software
-   Enzo Haruo França Okita - RGA: 2020.1906.019-9 - Engenharia de Software
-   Christian Antunes Nilles - RGA: 2020.1906.055-5 - Engenharia de Software

## Licença

Este projeto está licenciado sob a licença ISC. Consulte o arquivo LICENSE para mais detalhes.
