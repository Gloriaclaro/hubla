## General info
This project was developed for the hubla challenge.
The developed project uploads a creator's file, proccess the data and save in postgres.
The interface also show the transactions and the total value obtained.
	
## Technologies
Project is created with:
* Nestjs: 9.1.9
* Nextjs: 13.1.6
* Postgres: Docker version (3.1)
* Docker: 20.10.21
* Docker compose: 1.26.0

## Setup with docker-compose

## Backend

This command create backend image.

```
$ cd challenge/
$ sudo docker build -t backend:1.0.0 . --no-cache
```

## Frontend

This command create frontend image.

```
$ cd challenge-front/
$ sudo docker build -t frontend:1.0.0 . --no-cache
```

## To orchestrate the project 

This command run backend, frontend and prosgres with docker-compose.

```
$ cd ../
$ sudo docker-compose up -d
```

## URLs

* Frontend page: http://localhost:3000/transactions
* Backend swagger: http://localhost:4000/api
* Postgres admin: http://localhost:8080/
    * user: admin
    * password: admin
    * database: postgres
    * table: transaction
	

## Setup
To run this project, install it locally using npm:


## Backend
```
$ cd challenge/
$ npm install
$ npm start
```

## Frontend

```
$ cd challenge-front/
$ npm install
$ npm run dev
```

## Database docker-compose

```
$ cd challenge/
$ sudo docker-compose up
```

## Testing Backend

```
$ cd challenge/
$ npm run test
```
