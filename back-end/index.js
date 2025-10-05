const userController = require('./controllers/userControllers');
const userRoutes = require('./routes/userRoutes');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rota "Home"
app.get('/', (req, res) => {
    res.json({
        msg: "Você está na página inicial.",
    });
});

//Rotas "Cadastrar" & "Login"
app.use('/user', userRoutes);

//Usuário Logado
app.get('/loggedUser', userController.verificarAuth, (req, res) => {
    res.json({
        msg: `Você está logado. Seu ID é ${req.userId} e ele lhe permite acessar este recurso.`,
    });
});

//Usuário Administrador
app.get('/adminUser', userController.verificarAuth, userController.verificarAdminStatus, (req, res) => {
    res.json({
        msg: "Você está logado e possui privilégios de administrador.",
    });
});

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}.`);
});

module.exports = app;