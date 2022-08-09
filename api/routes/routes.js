const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const caronaController = require('../controllers/caronaController');
const veiculoController = require('../controllers/veiculoController');
const grupoController = require('../controllers/grupoController');
const login = require('../middleware/login');






//Usuario routes

//TODO: Colocar autenticação em todas as funções privadas

router.post('/signup', usuarioController.signup);

router.post('/login', usuarioController.login);


router.post('/avaliar',usuarioController.avaliar);

router.get('/getNota/:id',usuarioController.getNota);

router.post('/avaliarUsuariosCarona',usuarioController.avaliarUsuariosCarona);

router.post('/addFotoUsuario',usuarioController.addFotoUsuario);

router.post('/getFotoUsuario',usuarioController.getFotoUsuario);

router.post('/addDocumentacaoUsuario',usuarioController.addDocumentacaoUsuario);

router.post('/getUsuarioById',usuarioController.getUsuarioById);



//Carona routes

// // router.post('/addCarona',login.required, caronaController.addCarona);
router.post('/addCarona', caronaController.addCarona);


router.post('/deleteCarona', caronaController.deleteCarona);


router.post('/getCaronas', caronaController.getCaronas);


router.post('/getCaronasDestino', caronaController.getCaronasDestino);


router.post('/getCaronasOrigem', caronaController.getCaronasOrigem);

router.post('/reservarCarona', caronaController.reservarCarona);

router.post('/getCaronaById', caronaController.getCaronaById);

router.post('/iniciarCarona', caronaController.iniciarCarona);

router.post('/finalizarCarona', caronaController.finalizarCarona);

router.get('/getCaronasByUsuario/:usuario_id', caronaController.getCaronasByUsuario);

router.get('/getCaronasByGrupo/:grupo_id', caronaController.getCaronasByGrupo);


//Veiculo routes

router.post('/addVeiculoUsuario', veiculoController.addVeiculoUsuario);

router.post('/getVeiculoCarona', veiculoController.getVeiculoCarona);

router.post('/getVeiculo', veiculoController.getVeiculo);

router.post('/getVeiculoUsuario', veiculoController.getVeiculoUsuario);

router.post('/getVeiculos', veiculoController.getVeiculos);






//grupo routes

router.post('/addGrupo', grupoController.addGrupo);

router.get('/getGrupos',login.required, grupoController.getGrupos);

router.get('/getGrupoById', grupoController.getGrupoById);

router.post('/addGrupoUsuarioById', grupoController.addGrupoUsuarioById);

router.post('/addGrupoUsuarioByCodigo', grupoController.addGrupoUsuarioByCodigo);

router.get('/getGruposUsuario/:usuario_id', grupoController.getGruposUsuario);




module.exports = router;