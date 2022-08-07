-- Active: 1657307972966@@127.0.0.1@3306

USE Caronapp;

DROP TABLE IF EXISTS `USUARIO`;

CREATE TABLE `USUARIO` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`cpf` VARCHAR(20) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `sexo` VARCHAR(1) NOT NULL,
	`telefone` VARCHAR(14) NOT NULL,
	`senha` VARCHAR(200) NOT NULL,
	`cnh` VARCHAR(30),
	`foto` MEDIUMBLOB,
	`nota` DOUBLE unsigned NOT NULL DEFAULT '5',
	`num_avaliacoes` INT unsigned DEFAULT '0',
	PRIMARY KEY (`id`)
);



DROP TABLE IF EXISTS `CARONA`;

CREATE TABLE `CARONA` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`valor` DOUBLE NOT NULL,
	`origem` INT NOT NULL,
	`destino` INT NOT NULL,
	`veiculocarona` INT NOT NULL,
	`espaco` INT NOT NULL,
	`obs` TEXT(500),
	`datainicio` DATETIME NOT NULL,
	`datafim` DATETIME ,
	`grupo` INT,
    `condutor` INT NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `CARONA_USUARIO`;

CREATE TABLE `CARONA_USUARIO` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `carona_id` INT NOT NULL,
    `usuario_id` INT NOT NULL,
    `tipo` VARCHAR(10)  ,
    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `CARONA_USUARIO_AVALICAO`;

CREATE TABLE `CARONA_USUARIO_AVALICAO`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `carona_usuario_id` INT NOT NULL,
    `nota` DOUBLE NOT NULL,
    `comentario` TEXT(500),
    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `GRUPO`;

CREATE TABLE GRUPO(
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `codigo` TEXT(500),
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `GRUPO_USUARIO`;

CREATE TABLE GRUPO_USUARIO(
    `id` INT NOT NULL AUTO_INCREMENT,
    `grupo_id` INT NOT NULL,
    `usuario_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `LOCALIZACAO`;

CREATE TABLE LOCALIZACAO(
    `id` INT NOT NULL AUTO_INCREMENT,
    `local` VARCHAR(100) NOT NULL,
    `cidade` INT NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `CIDADE`;

CREATE TABLE CIDADE( 
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `uf` INT NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `ESTADO`;

CREATE TABLE ESTADO(
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `sigla` VARCHAR(2) NOT NULL,
    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `VEICULO`;
CREATE TABLE VEICULO(
    `id` INT NOT NULL AUTO_INCREMENT,
    `marca` VARCHAR(50) NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `tipo` VARCHAR(50) ,
    `capacidade` INT NOT NULL,
    `foto` MEDIUMBLOB,
    PRIMARY KEY (`id`)
);



DROP TABLE IF EXISTS `VEICULO_USUARIO`;

CREATE TABLE VEICULO_USUARIO(
    `id` INT NOT NULL AUTO_INCREMENT,
    `veiculo` INT NOT NULL,
	`ano` VARCHAR(4) NOT NULL,
    `cor` VARCHAR(15) NOT NULL,
    `placa` VARCHAR(7) NOT NULL,
    `renavam` VARCHAR(30) NOT NULL,
    `usuario_id` INT unsigned NOT NULL,
    
    FOREIGN KEY (`usuario_id`) REFERENCES `USUARIO`(`id`) ON DELETE CASCADE,

    FOREIGN KEY (`veiculo`) REFERENCES `VEICULO`(`id`) ON DELETE CASCADE,

    PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `VEICULO_CARONA`;

CREATE TABLE `VEICULO_CARONA` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `veiculo` INT NOT NULL,
	`ano` VARCHAR(4) NOT NULL,
	`cor` VARCHAR(15) NOT NULL,
	`placa` VARCHAR(7) NOT NULL,
	`renavam` VARCHAR(30) NOT NULL,
    

    FOREIGN KEY (`veiculo`) REFERENCES `VEICULO`(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);

#insert into CIDADE values (1, 'Belo Horizonte', 1);
#insert into CIDADE values (2, 'São Paulo', 1);
#insert into CIDADE values (3, 'Rio de Janeiro', 1);
#insert into CIDADE values (4, 'Brasília', 1);
#insert into CIDADE values (5, 'Curitiba', 1);


-- INSERT INTO `CIDADE` (`id`, `nome`, `uf`) VALUES
-- (1, 'Belo Horizonte', 1),
-- (2, 'São Paulo', 1),
-- (3, 'Rio de Janeiro', 1),
-- (4, 'Brasília', 1),
-- (5, 'Curitiba', 1);


INSERT INTO ESTADO (`id`, `nome`, `sigla`) VALUES
(1, 'Minas Gerais', 'MG'),
(2, 'São Paulo', 'SP'),
(3, 'Rio de Janeiro', 'RJ'),
(4, 'Brasília', 'DF'),
(5, 'Curitiba', 'PR'),
(6,'Espírito Santo','ES'),
(7,'Bahia','BA'); 


INSERT INTO CIDADE(`id`, `nome`, `uf`) VALUES
(1, 'Belo Horizonte', 1),
(2, 'São Paulo', 2),
(3, 'Rio de Janeiro', 3),
(4, 'Vila Velha', 6),
(5, 'Cachoeiro de Itapemirim', 6),
(6, 'Vitória', 6),
(7,'Teixeira de Freitas',7); 


INSERT INTO LOCALIZACAO(`id`, `local`, `cidade`) VALUES
(1,'BNH',5),
(2,'Jardim da Penha',6),
(3,'Pampulha',1),
(4,'Ponta da Fruta',4); 


INSERT INTO GRUPO(`id`, `nome`, `codigo`) VALUES
(1,'Caronas Vitória', 'xXxXx'),
(2,'Caronas Cachoeiro', 'x111x');


INSERT INTO USUARIO(`id`, `nome`, `email`, `senha`, `telefone`, `data_nascimento`, `sexo`, `foto`) VALUES
(1,'João Gomes', 'joao@email.com','$2b$10$7g.FupWuZCdcbPuOas3fEuKTSQH/v07D54VaSFDXck1C11nkxHSNS','28999009090', '1991-01-01', 'M', 'foto.jpg'),
(2,'Maria Antunes', 'maria@email.com','$2b$10$7g.FupWuZCdcbPuOas3fEuKTSQH/v07D54VaSFDXck1C11nkxHSNS','28999009090', '1991-01-01', 'F', 'foto.jpg'),
(3,'Pedro Paulo', 'pedro@email.com','$2b$10$7g.FupWuZCdcbPuOas3fEuKTSQH/v07D54VaSFDXck1C11nkxHSNS','28999009090', '1991-02-01', 'M', 'foto.jpg'),
(4,'Joana Maria', 'joana@email.com','$2b$10$7g.FupWuZCdcbPuOas3fEuKTSQH/v07D54VaSFDXck1C11nkxHSNS','28999009090', '1991-02-01', 'F', 'foto.jpg'),
; 



INSERT INTO GRUPO_USUARIO(`id`, `grupo`, `usuario`) VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,1,4),
(5,2,1),
(6,2,2),
(7,2,4);




INSERT INTO VEICULO(`id`, `marca`, `nome`, `tipo`, `capacidade`, `foto`) VALUES
(1,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(2,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(3,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(4,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(5,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(6,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(7,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(8,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(9,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(10,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(11,'Toyota','Corolla','Sedan',4,'foto.jpg'),
(12,'Toyota','Corolla','Sedan',4,'foto.jpg');



INSERT INTO VEICULO_USUARIO(`id`, `veiculo`, `usuario`) VALUES
(1,1,1),
(2,2,1),
(3,3,1),
(4,4,1),
(5,5,1),
(6,6,1),
(7,7,1),
(8,8,1),
(9,9,1),
(10,10,1),
(11,11,1),
(12,12,1);

