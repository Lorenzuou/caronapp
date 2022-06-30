CREATE TABLE `PESSOA` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(80) NOT NULL,
	`email` VARCHAR(80) NOT NULL,
	`nota` DOUBLE DEFAULT '5',
	`sexo` CHAR(1) NOT NULL,
	`creditos` INT DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `CARONA` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`espaco` INT NOT NULL,
	`horario_saida` DATETIME NOT NULL,
	`data` DATETIME NOT NULL,	
	`origem` VARCHAR(100) NOT NULL,
	`destino` VARCHAR(100) NOT NULL,
	`obs` TEXT(800),
	`status` INT,
	PRIMARY KEY (`id`)
);


