const express = require('express');
const router = express.Router();
const programmingLanguagesController = require('../controllers/usuarioController');



// /* GET programming languages. */
// router.get('/', programmingLanguagesController.get);
  
/* POST programming language */
router.post('/singin', programmingLanguagesController.singin);
/* POST programming language */
router.post('/singup', programmingLanguagesController.singup);

module.exports = router;