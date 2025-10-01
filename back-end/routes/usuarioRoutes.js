import { cadastrar, login } from '../controllers/usuarioControllers';

const router = require("express").Router();

router.post("/cadastrar", cadastrar);

router.post("/login", login);

export default router;