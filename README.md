
# API para gym inferno

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

DB_USER=

DB_PASSWORD=1234

DB_NAME=

PORT=8000

# Construcción de base de datos

show databases; 
CREATE DATABASE infernogym_mysql_t;
use infernogym_mysql_ts;
show tables;

CREATE TABLE exercise (
    exercise_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(200) NOT NULL,
    exercise_description TEXT NOT NULL,
    weightexercise FLOAT NOT NULL,  
    series INT NOT NULL,
    repetitions INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    updated_by VARCHAR(50),
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE diete (
    diete_id INT AUTO_INCREMENT PRIMARY KEY,
    foods TEXT NOT NULL,
    progress TEXT,
    subscription BOOLEAN DEFAULT 0, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE mail (
    mail_id INT AUTO_INCREMENT PRIMARY KEY,
    messages TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    deleted BOOLEAN DEFAULT FALSE
); 

create table role_user (
role_id int primary key AUTO_INCREMENT,
title varchar(50) NOT NULL,
description text,
created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE
);

CREATE TABLE user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(50) NOT NULL,
  password  VARCHAR(255) NOT NULL, 
  role_id_fk INT NOT NULL,
  created_at DATETIME NOT NULL,
  created_by VARCHAR(50),
  updated_at DATETIME NOT NULL,
  updated_by VARCHAR(50),
  deleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (role_id_fk) REFERENCES role_user(role_id)
);


SELECT * FROM role_user;

es necesario crear este elemento para poder asignar un rol
INSERT INTO role_user (title, description, created_at, created_by, updated_at, updated_by, deleted) 
VALUES ('Administrador', 'Rol de administrador', NOW(), 'admin', NOW(), 'admin', FALSE);

SELECT * FROM role_user WHERE title = 'Administrador';

DESCRIBE role_user;
DESCRIBE user;
SELECT * FROM user
