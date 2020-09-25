# Cockta.io API :tropical_drink:
Link do front-end da aplicação: [Cockta.io](https://github.com/GeovaniJose/ruptiva-challenge-web)

> :underage: Àlcool para menores é proibido

## Instalação :sparkles:
> Você precisa ter instalado em sua máquina o [Git](https://git-scm.com) e o [Yarn](https://yarnpkg.com/)
1. Clone este repositório
```bash
$ git clone https://github.com/GeovaniJose/ruptiva-challenge-api.git
```

2. Entre na pasta do repositório
```bash
$ cd ruptiva-challenge-api
```

3. Rode o comando para instalar as dependências
```bash
$ yarn
```

## Como rodar :white_check_mark:
> Passo a passo para rodar a aplicação
1. Crie um banco de dados postgres na sua máquina

2. Abra o arquivo ormconfig.json na raíz do projeto

3. Substitua o 'username', 'password', e 'database' com as informações do seu banco criado

4. Rode o comando para iniciar a aplicação
```bash
$ yarn dev:server
```

## Rotas :triangular_flag_on_post:
> Base url, endpoints e params disponíveis na aplicação
* **Base URL**

  `http://localhost:3333`

* **URL endpoints**

  `POST /users`: Rota para criar um usuário no banco de dados, deve enviar um JSON com os campos `name`(string), `age`(number), `email`(string), `password`(string);

  `PATCH /users/avatar`: Rota para atualizar o campo `avatar` de um usuário, deve enviar uma imagem(file);

  `POST /sessions`: Rota para criar uma sessão do usuário no banco de dados, deve enviar um JSON com os campos `email`(string), `password`(string);

  `POST /cocktails`: Rota para criar um coquetel no banco de dados, deve enviar um JSON com os campos `name`(string), `alcohol_level`(number), `ingredients`(array), `password`(string);

  `GET /cocktails`: Rota para listar os coquetéis do usuário logado;

  `DELETE /cocktails/:id`: Rota para remover um coquetel do usuário logado, deve enviar um parâmetro `id` representando o id do coquetel.

* **URL Params**

  `id=[uuid]`

## Tecnologias :wrench:
> Tecnologias usadas no desenvolvimento do projeto:
- Node
- TypeScript
- Yarn
- Express
- TypeORM
- JWB
- Multer

## License :page_facing_up:
[MIT License](LICENSE)
