const express = require("express");
const router = express.Router();

const usuarioController = require('../controllers/usuarioControllers');

router.post("/cadastrar", usuarioController.cadastrar);


module.exports = router;