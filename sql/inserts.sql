
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

