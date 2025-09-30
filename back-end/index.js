const express = require("express");

const app = express();

const usuarioController = require('../back-end/controllers/usuarioControllers');

const usuarioRoutes = require("../back-end/routes/usuarioRoutes");
app.use("/usuario", usuarioRoutes);

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.listen(5000, (err) => {
    console.log("Aplicação rodando na porta 5000...");
});
