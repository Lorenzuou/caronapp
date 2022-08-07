const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const caronaController = require('../controllers/caronaController');
const veiculoController = require('../controllers/veiculoController');
const grupoController = require('../controllers/grupoController');
const login = require('../middleware/login');






//Usuario routes

//TODO: Colocar autenticação em todas as funções privadas

router.post('/singup', usuarioController.singup);

router.post('/login', usuarioController.login);


router.post('/avaliar',login.required,usuarioController.avaliar);

router.get('/getNota/:id',login.required,usuarioController.getNota);

router.post('/avaliarUsuariosCarona',login.required,usuarioController.avaliarUsuariosCarona);

router.post('/addFotoUsuario',login.required,usuarioController.addFotoUsuario);

router.post('/getFotoUsuario',login.required,usuarioController.getFotoUsuario);

router.post('/addDocumentacaoUsuario',login.required,usuarioController.addDocumentacaoUsuario);




// //Carona routes

// // router.post('/addCarona',login.required, caronaController.addCarona);
router.post('/addCarona',login.required, caronaController.addCarona);


router.post('/deleteCarona',login.required, caronaController.deleteCarona);


router.post('/getCaronas',login.required, caronaController.getCaronas);


router.post('/getCaronasDestino',login.required, caronaController.getCaronasDestino);


router.post('/getCaronasOrigem',login.required, caronaController.getCaronasOrigem);

router.post('/reservarCarona',login.required, caronaController.reservarCarona);


router.post('/iniciarCarona',login.required, caronaController.iniciarCarona);

router.post('/getCaronaById',login.required, caronaController.getCaronaById);


//Veiculo routes

router.post('/addVeiculoUsuario',login.required, veiculoController.addVeiculoUsuario);

router.post('/getVeiculoCarona',login.required, veiculoController.getVeiculoCarona);







//grupo routes

router.post('/addGrupo',login.required, grupoController.addGrupo);

router.get('/getGrupos',login.required, grupoController.getGrupos);

router.get('/getGrupoById',login.required, grupoController.getGrupoById);

router.post('/addGrupoUsuarioById',login.required, grupoController.addGrupoUsuarioById);

router.post('/addGrupoUsuarioByCodigo',login.required, grupoController.addGrupoUsuarioByCodigo);

router.post('/getGruposUsuario',login.required, grupoController.getGruposUsuario);




module.exports = router;