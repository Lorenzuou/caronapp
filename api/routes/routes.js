const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const caronaController = require('../controllers/caronaController');
const veiculoController = require('../controllers/veiculoController');
const grupoController = require('../controllers/grupoController');
const login = require('../middleware/login');



// /* GET programming languages. */
// router.get('/', programmingLanguagesController.get);




//Usuario routes

//TODO: Colocar autenticação em todas as funções privadas

router.post('/singup', usuarioController.singup);

router.post('/login', usuarioController.login);


router.post('/avaliar',usuarioController.avaliar);

router.get('/getNota/:id',usuarioController.getNota);

router.post('/avaliarUsuariosCarona',usuarioController.avaliarUsuariosCarona);

router.post('/addFotoUsuario',usuarioController.addFotoUsuario);

router.post('/getFotoUsuario',usuarioController.getFotoUsuario);

router.post('/addDocumentacaoUsuario',usuarioController.addDocumentacaoUsuario);




//Carona routes

// router.post('/addCarona',login.required, caronaController.addCarona);
router.post('/addCarona', caronaController.addCarona);


router.post('/deleteCarona', caronaController.deleteCarona);


router.get('/getCaronas', caronaController.getCaronas);


router.get('/getCaronasDestino', caronaController.getCaronasDestino);


router.get('/getCaronasOrigem', caronaController.getCaronasOrigem);





//Veiculo routes
router.post('/addVeiculoCarona', veiculoController.addVeiculoCarona);

router.post('/addVeiculoUsuario', veiculoController.addVeiculoUsuario);






//grupo routes

router.post('/addGrupo', grupoController.addGrupo);

router.get('/getGrupos', grupoController.getGrupos);

router.get('/getGrupoById', grupoController.getGrupoById);





module.exports = router;