const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const caronaController = require('../controllers/caronaController');
const login = require('../middleware/login');



// /* GET programming languages. */
// router.get('/', programmingLanguagesController.get);




//Usuario routes



router.post('/singup', usuarioController.singup);

router.post('/login', usuarioController.login);


router.post('/avaliar',usuarioController.avaliar);

router.get('/getNota/:id',usuarioController.getNota);




//Carona routes

// router.post('/addCarona',login.required, caronaController.addCarona);
router.post('/addCarona',login.required, caronaController.addCarona);


router.post('/deleteCarona', caronaController.deleteCarona);


router.get('/getCaronas', caronaController.getCaronas);


router.get('/getCaronasDestino', caronaController.getCaronasDestino);




router.get('/getCaronasOrigem', caronaController.getCaronasOrigem);









module.exports = router;