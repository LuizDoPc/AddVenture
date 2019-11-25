# AddVenture

## DORA - Sistema para gestão de aventuras

DORA é um sistema que permite cadastrar e gerenciar aventuras, passeios, trilhas e demais atividades relacionadas ao ecoturismo.
É possível, através do DORA, gerenciar participantes e o pagamento de inscrições para as aventuras.

# Tecnologias Utilizadas

## Linguagem

A linguagem utilizada será JavaScript na biblioteca node.js 8.11.2 com o framework express e sequelize como ORM.

## Banco de Dados

O banco de dados utilizado será o Postgres

# INSTALAÇÃO E EXECUÇÃO

## DOCKER

Sugerimos utilizar o docker para rodar o banco de dados.

docker pull postgres
docker run --name teste-postgres --network=postgres-network -e "POSTGRES_PASSWORD=toor" -p 5432:5432 -v ~/Documentos/PostgreSQL:/var/lib/postgresql/data -d postgres

docker pull dpage/pgadmin4
docker run --name teste-pgadmin --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=luiz.soares@estudante.ufla.br" -e "PGADMIN_DEFAULT_PASSWORD=toor" -d dpage/pgadmin4

## FRONTEND

Para executar o frontend basta um navegador (Google Chrome, Firefox ou Safari) atualizado.

## BACKEND

O backend foi construído em node.js. Para executa-lo siga os passos a seguir:

- Acesse https://nodejs.org/en/download/ e faça o download e instalação do node.js.
- git clone https://github.com/LuizDoPc/AddVenture
- cd AddVenture
- npm i yarn -g
- yarn
- yarn start

# ANTES DE CONTRIBUIR

### Prettier

Sugerimos a utilização do Prettier para manter o padrão do código do projeto. Para isso, adicione as seguintes configurações ao seu editor.

```json
    "[javascript]": {
        "editor.formatOnSave": true
    },
    "prettier.printWidth": 120,
    "prettier.tabWidth": 2,
    "prettier.singleQuote": true,
```

### Eslint

O eslint ja está configurado no projeto de backend.

**Links de instalação**

- [VSCode](https://github.com/prettier/prettier-vscode)

## GIT FLOW

Nesse projeto utilizamos o git flow como framework de git. Mais informações em [Git Flow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04)

### Regras básicas

- Antes de trabalhar em uma funcionalidade ou correção deve-se criar uma nova branch a partir da develop com o padrão:

  - Novas funcionalidades: feature/describeYourFeature
  - Correções: bugfix/describeYourFix

- Ao terminar uma funcionalidade ou correção abrir pull request e após ao menos uma aprovação fazer o merge na develop

- Ao terminar uma etapa de desenvolvimento, fazer o merge na master e gerar uma release
