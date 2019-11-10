# AddVenture

## DORA - Sistema para gestão de aventuras

DORA é um sistema que permite cadastrar e gerenciar aventuras, passeios, trilhas e demais atividades relacionadas ao ecoturismo.
É possível, através do DORA, gerenciar participantes e o pagamento de inscrições para as aventuras.

# Tecnologias Utilizadas

## Linguagem

A linguagem utilizada será JavaScript na biblioteca node.js 8.11.2 com o framework express e sequelize como ORM.

## Banco de Dados

O banco de dados utilizado será o MariaDB versão 10.4.8.

## Servidor

O servidor utilizado será o Apache versão 2.4.27

# INSTALAÇÃO E EXECUÇÃO

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
