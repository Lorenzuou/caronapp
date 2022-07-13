-- Active: 1657307972966@@127.0.0.1@3306@Caronapp
CREATE TABLE `PESSOA` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`senha` VARCHAR(255) NOT NULL,
	`nome` VARCHAR(80) NOT NULL,
	`email` VARCHAR(80) NOT NULL,
	`nota` DOUBLE DEFAULT '5',
	`sexo` CHAR(1) NOT NULL,
	`creditos` INT DEFAULT '0',
	`num_avaliacoes` INT DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `CARONA` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`espaco` INT NOT NULL,
	`horario_saida` DATETIME NOT NULL,
	`data` DATETIME NOT NULL,	
	`origem` VARCHAR(100) NOT NULL,
	`destino` VARCHAR(100) NOT NULL,
	`nota` INT DEFAULT '5',
	`obs` TEXT(800),
	`status` INT DEFAULT '0',
	PRIMARY KEY (`id`)
);




CREATE TABLE `CARONA_PESSOA` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`carona_id` INT NOT NULL,
	`pessoa_id` INT NOT NULL,
	`status` INT DEFAULT '0',
	PRIMARY KEY (`id`)
);


CREATE TABLE `CARONA_PESSOA_COMENTARIO` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`carona_pessoa_id` INT NOT NULL,
	`comentario` TEXT(800),
	`data` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);




