# Build your Deck  



## Sobre

Aplicação Front-end desenvolvida para que usuários possam criar o seu perfil e monta varios decks de yu-gi-oh.



## Requisitos de software 

![npm version](https://img.shields.io/badge/npm-9.8.1-red) ![npm version](https://img.shields.io/badge/react-17.0.2-blue) ![yarn version](https://img.shields.io/badge/yarn-1.22.18-blue)![npm version](https://img.shields.io/badge/docker-20.10.7-9cf)![node version](https://img.shields.io/badge/node-16.18.0-026e00)



## Procedimentos de execução sem docker



Clone o projeto via SSH ou HTTPS

Via SSH

```bash
git clone https://github.com/RodrigoGuedelho/build-yugioh-deck-frontend.git
```



Com o projeto clonado, acesse o diretório e instale todas as dependências necessárias

```bash
cd build-yugioh-deck-frontend
yarn
```



Inicie a aplicação para desenvolvimento

```bash
yarn next dev
```

Gerar build da aplicação

```bash
yarn next build

Gerar Iniciar aplicação após build

```bash
yarn next start

Acesse  localhost na porta 3000 

<img src="imgs/aplicação.png" style="zoom: 150%;" />



### Procedimentos de execução com docker



> Os procedimentos para execução da aplicação através do docker requer os arquivos **Dockerfile** e **docker-compose.yml**



Para construir a  imagem Node e montar as instruções de linhas de comando que serão executadas de acordo com o contexto de produção, execute o seguinte comando do **docker-compose**: 

```bash
docker-compose build
```



Após o build, para iniciar o contâiner, execute:

```bash
docker-compose up
```



Para iniciar o contâiner em modo background, execute:

```
docker-compose up -d
```



