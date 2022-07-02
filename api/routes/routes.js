const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const caronaController = require('../controllers/caronaController');



// /* GET programming languages. */
// router.get('/', programmingLanguagesController.get);




//Usuario routes


router.post('/singin', usuarioController.singin);

router.post('/singup', usuarioController.singup);









//Carona routes

router.post('/addCarona', caronaController.addCarona);


router.post('/deleteCarona', caronaController.deleteCarona);


router.get('/getCaronas', caronaController.getCaronas);


router.get('/getCaronasDestino', caronaController.getCaronasDestino);




router.get('/getCaronasOrigem', caronaController.getCaronasOrigem);









module.exports = router;