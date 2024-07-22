
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

CREATE TABLE user_exercise (
    user_exercise_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    exercise_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (exercise_id) REFERENCES exercise(exercise_id)
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

CREATE TABLE subscription (
  subscription_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at datetime NOT NULL,
created_by varchar(50),
updated_at datetime NOT NULL,
updated_by varchar(50),
deleted boolean DEFAULT FALSE
);

CREATE TABLE user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  password VARCHAR(255), -- Campo de password agregado
  weight DECIMAL,
  height DECIMAL,
  age INT,
  progress TEXT,
  subscription_id INT, -- Campo de suscripción ahora referencia a la tabla subscription
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT,
  deleted BOOLEAN DEFAULT FALSE,
  role_id_fk INT,
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES user(user_id),
  CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES user(user_id),
  CONSTRAINT fk_role_id FOREIGN KEY (role_id_fk) REFERENCES role_user(role_id),
  CONSTRAINT fk_subscription_id FOREIGN KEY (subscription_id) REFERENCES subscription(subscription_id)
);

CREATE TABLE user_client (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    client_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (client_id) REFERENCES user(user_id)
);


CREATE TABLE diete (
  diete_id INT PRIMARY KEY AUTO_INCREMENT,
  foods TEXT,
  progress TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by INT,
  user_id INT,
  deleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (created_by) REFERENCES user(user_id),
  FOREIGN KEY (updated_by) REFERENCES user(user_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

    
CREATE TABLE mail (
    mail_id INT AUTO_INCREMENT PRIMARY KEY,
    messages TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    deleted BOOLEAN DEFAULT FALSE,
    recipient_id INT,
    FOREIGN KEY (recipient_id) REFERENCES user(user_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (updated_by) REFERENCES user(user_id)
);



INSERT INTO role_user (title, description, created_at, created_by, updated_at, updated_by, deleted) 
VALUES ('Administrador', 'Rol de administrador', NOW(), 'admin', NOW(), 'admin', FALSE);

INSERT INTO role_user (title, description, created_at, created_by, updated_at, updated_by, deleted) 
VALUES ('Cliente', 'Rol de cliente', NOW(), 'clien', NOW(), 'clien', FALSE);

INSERT INTO role_user (title, description, created_at, created_by, updated_at, updated_by, deleted) 
VALUES ('Nutricionista', 'Rol de nutricionista', NOW(), 'nutri', NOW(), 'nutri', FALSE);

INSERT INTO role_user (title, description, created_at, created_by, updated_at, updated_by, deleted) 
VALUES ('Coach ', 'Rol de coach ', NOW(), 'coach ', NOW(), 'coach ', FALSE);
SELECT * FROM role_user WHERE title = 'Administrador';

SELECT * FROM subscription;
-- Inserta la suscripción Free
INSERT INTO subscription (name, description, created_at, created_by, updated_at, updated_by, deleted)
VALUES ('Free', 'Free subscription', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin', FALSE);

-- Inserta la suscripción Basic
INSERT INTO subscription (name, description, created_at, created_by, updated_at, updated_by, deleted)
VALUES ('Basic', 'Basic subscription', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin', FALSE);

-- Inserta la suscripción Premium
INSERT INTO subscription (name, description, created_at, created_by, updated_at, updated_by, deleted)
VALUES ('Premium', 'Premium subscription', CURRENT_TIMESTAMP, 'admin', CURRENT_TIMESTAMP, 'admin', FALSE);
