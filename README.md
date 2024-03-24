# SB Group Test

## API Rest utilizando node, express e mongodb.

- A API possui endpoint de login com jwt com tratamento de erros e autenticação.
- CRUD de usuários (nome, cpf, data de nascimento, email e senha).
- No endpoint de listagem de usuários existem filtros por nome, cpf e email.

### Modelo de Projeto:

#### SOLID aplicado a uma Arquitetura em camadas (Clean Architecture).

      S — Single Responsiblity Principle (Princípio da responsabilidade única)

      O — Open-Closed Principle (Princípio Aberto-Fechado)

      L — Liskov Substitution Principle (Princípio da substituição de Liskov)

      I — Interface Segregation Principle (Princípio da Segregação da Interface)

      D — Dependency Inversion Principle (Princípio da inversão da dependência)

### Principais ferramentas e tecnologias utilizadas no Projeto:


  ![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
  ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Typeorm {📄}](https://img.shields.io/badge/Typeorm_{📄}-ff1600?style=for-the-badge&logo=typeorm&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
  ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
  ![Celebrate](https://img.shields.io/badge/Celebrate-19206F?style=for-the-badge&logo=celebrate&logoColor=white)


## Banco de Dados:

  - Instale o MongoDB ou crie um container docker com uma imagem MongoDB.
  - Crie um Banco de Dados com o nome que desejar e em seguida o adicione no arquivo ``.env.example`` seguindo o modelo presente no arquivo.
  - Depois altere o nome do arquivo para ``.env.dev``.

## Instalação Local:

1. Baixe o arquivo zip do repositório ou faça um clone do projeto na sua máquina.

  ```bash
    git clone https://github.com/HadokBjorn/SB_Group_test.git
  ```
2. Em seguida dê o comando `` npm install `` ou `` yarn install `` no prompt de comando aberto na pasta raiz do projeto.

3. Após ter iniciado o seu Banco de dados execute o comando ``npm run seed`` ou ``yarn run seed`` para gerar os usuários em seu Banco de Dados.

4. Após executar o script `seed`, basta usar o comando `npm run dev` ou `yarn run dev` para a aplicação ficar online na porta `5000` no localhost.

5. Para conseguir acessar as rotas autenticadas, use o login de Administrador na rota `localhost:5000/users/auth`:

  ```ts
      {
        email: "admin@gmail.com",
        password: "12345678"
      }
  ```
  você receberá um token para conseguir ter acesso as demais rotas da aplicação.

## Documentação:
## Execução de testes:
