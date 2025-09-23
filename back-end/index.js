const express = require("express");

const app = express();

const usuarioController = require('../back-end/controllers/usuarioControllers');

const mesaControllers = require("../back-end/controllers/mesaControllers")

const mesaRoutes = require("../back-end/routes/mesaRoutes")
app.use("/mesa", mesaControllers);

const usuarioRoutes = require("../back-end/routes/usuarioRoutes");
app.use("/usuario", usuarioRoutes);

app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.listen(5000, (err) => {
    console.log("Aplicação rodando na porta 5000...");
});
