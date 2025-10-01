import express, { urlencoded, json } from 'express';
import router from "./routes/usuarioRoutes";
import { verificarAutenticacao, verificarStatus } from './controllers/usuarioControllers';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
    res.render("home");
});

app.use("/usuario", router);

app.get("/areaLogada", verificarAutenticacao, (req, res) => {
    res.json({
        msg: "Você está logado com o ID " + req.usuarioId + " e pode acessar este recurso.",
    });
});

app.get("/areaAdmin", verificarAutenticacao, verificarStatus, (req, res) => {
    res.json({
        msg: "Você é um adminstrador!",
    });
});

export default app;