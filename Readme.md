# Code Test Authentication and Fetch

This is code test project about Authentication and Fetch API. This project includes 2 folders, backend and frontend.
Backend components are : 
* NodeJs
* Posgresql
* Redis
* Docker
Frontent component is :
* ReactJs

## Installation

Before you run this project, please kindly install docker and docker-compose by this following links [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) if you have not been installed them.

## Running the tests

To run this code please move to ***backend*** directory by following this command
```Bash
##if you outside working directory
cd ./calman-code-test/backend

##if you inside working directory
cd ./backend
```

### running docker-composer

To start services, run using *docker-compose* command

```Bash
#kill all docker container 
sudo docker-compose down

##for the first time run the project
sudo docker-compose up --build

##next time after build
sudo docker-compose up
```

## Applications
Default ports that used in this project are:
* Authorization URL - ***127.0.0.1:5000***
* Fetch URL - ***127.0.0.1:5001***
* Front End URL - ***127.0.0.1:3000***

To change the ports, please open the `docker-compose.yml` file, and change the port parts

```Yaml
# Backend
  code-test-auth-api:
    ...
    ports:
      - "5000:5000"

  # Backend
  code-test-fetch-api:
    ...
    ports:
      - "5001:5001"

  #Frontend
  code-test-frontend:
    ...
    ports:
      - "3000:3000"
```


## Authors

* **Calmantara Sumpono Putra**  - [Github](https://github.com/Calmantara)

## Acknowledgments

* Allah SWT
* My Mommy
* All sides that support and inpire me
