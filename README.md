## Description
### StartUp Fintech
Project for online payments. 
Initially we have two types of users on the platform, one who makes payments and the other who just receives. But with the expansion of the product in mind, the project was created to be used on a larger scale. For example, we have a table where we store the types of users and whether or not they can make transfers.


This project was created using nestJs and TypeOrm.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup
```bash
$ nvm use 18.0.0
```

```bash
$ npm install
```

## Starting the project for the first time with docker
Docker will build and initialize the entire project and database

```bash
# build with docker
$ make build

# docker up and start 
$ make up
```

## Commands Docker

```bash
# remove containers
$ make down 

# build without cache
$ make build
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources
project running on port 3000

> **Look at the `use.http` file to find out the endpoints and requirements**
Se você estiver usando um IDE VScode, precisa instalar um extenso cliente REST, vá no arquivo, clique com o botão direito em `send request` para chamar os endpoints

## Stay in touch

- Author - https://www.linkedin.com/in/caianehardt/
- Website - https://github.com/caianeHardt


## Info, backlog and future implementations
- Initially, passwords are encrypted and saved in the bank, however another flow must be implemented, for example, using Firebase to have more security when logging in.
- Finish create user.
- Finish implementation swagger

