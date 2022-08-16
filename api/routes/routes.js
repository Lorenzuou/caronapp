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


// router.post('/avaliar',usuarioController.avaliar);

router.get('/getNota/:usuario_id',login.required,usuarioController.getNota);

router.post('/avaliarUsuariosCarona',login.required,usuarioController.avaliarUsuariosCarona);

router.post('/addFotoUsuario',login.required,usuarioController.addFotoUsuario);

router.get('/getFotoUsuario/:usuario_id',login.required,usuarioController.getFotoUsuario);

router.post('/addDocumentacaoUsuario',login.required,usuarioController.addDocumentacaoUsuario);

router.get('/getUsuarioById',login.required,usuarioController.getUsuarioById);

router.get('/getVeiculosUsuario',login.required,usuarioController.getVeiculosUsuario);

//Carona routes

// // router.post('/addCarona',login.required, caronaController.addCarona);
router.post('/addCarona', login.required,caronaController.addCarona);

router.get('/getLocalizacao/:local', login.required,caronaController.getLocalizacao);

router.get('/getLocalizacao/', login.required,caronaController.getLocalizacao);

router.post('/deleteCarona',login.required, caronaController.deleteCarona);


router.post('/getCaronas',login.required, caronaController.getCaronas);


router.post('/getCaronasDestino', login.required,caronaController.getCaronasDestino);


router.post('/getCaronasOrigem',login.required, caronaController.getCaronasOrigem);

router.post('/reservarCarona/:carona_id', login.required,caronaController.reservarCarona);

router.get('/getCaronaById/:carona_id', login.required,caronaController.getCaronaById);

router.post('/iniciarCarona',login.required, caronaController.iniciarCarona);

router.post('/finalizarCarona',login.required, caronaController.finalizarCarona);

router.get('/getCaronasByUsuario',login.required, caronaController.getCaronasByUsuario);

router.get('/getCaronasByGrupo/:grupo_id', login.required,caronaController.getCaronasByGrupo);


//Veiculo routes

router.post('/addVeiculoUsuario',login.required, veiculoController.addVeiculoUsuario);

router.get('/getVeiculoCarona/:veiculo_id',login.required, veiculoController.getVeiculoCarona);

router.get('/getVeiculo/:veiculo_id',login.required, veiculoController.getVeiculo);

router.get('/getVeiculoUsuario',login.required, veiculoController.getVeiculoUsuario);

router.get('/getVeiculos',login.required, veiculoController.getVeiculos);

router.delete('/deleteVeiculoUsuario/:veiculo_id',login.required, veiculoController.deleteVeiculoUsuario);




//grupo routes

router.post('/addGrupo/:nome_grupo',login.required, grupoController.addGrupo);

router.get('/getGrupos',login.required, grupoController.getGrupos);

router.get('/getGrupoById/:grupo_id',login.required, grupoController.getGrupoById);

router.get('/addGrupoUsuarioById',login.required, grupoController.addGrupoUsuarioById);

router.post('/addGrupoUsuarioByCodigo',login.required, grupoController.addGrupoUsuarioByCodigo);

router.get('/getGruposUsuario',login.required, grupoController.getGruposUsuario);

router.post('/addGrupoByCodigo/:grupo',login.required, grupoController.addGrupoByCodigo);


module.exports = router;