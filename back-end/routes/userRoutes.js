const userController = require('../controllers/userControllers');
const router = require('express').Router();

//Rota "Cadastrar"
router.post('/cadastrar', userController.cadastrar);

//Rota "Login"
router.post('/login', userController.login);

module.exports = router;