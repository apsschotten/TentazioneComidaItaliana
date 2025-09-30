const express = require("express");
const router = express.Router();

const usuarioController = require('../controllers/usuarioControllers');

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/login", usuarioController.login);

module.exports = router;