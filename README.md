
# API para tienda (Práctica)

API desarrollada en express con Typescript como ejemplo para clase de fundamento de base de datos.

Descargar módulos
* npm install

Iniciar proyecto
* npm run dev

Construir app
* npm run start

# Ejemplo de variables de entorno (.env)
DB_HOST=localhost

DB_PORT=3306

DB_USER=pedro

DB_PASSWORD=1234

DB_NAME=tienda_familiar

PORT=8000

# Construcción de base de datos

create database tienda_familiar;
use tienda_familiar;
create table product (
product_id int primary key AUTO_INCREMENT,
name varchar(50) NOT NULL,
stock int DEFAULT 0,
type_measurement varchar(30) DEFAULT "Unidades",
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE
);
create table role_employee (
role_id int primary key AUTO_INCREMENT,
title varchar(50) NOT NULL,
description text,
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE
);
create table employee (
employee_id int primary key AUTO_INCREMENT,
full_name varchar(50) NOT NULL,
role_id_fk int NOT NULL,
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE,
foreign key(role_id_fk) references role_employee(role_id)
);