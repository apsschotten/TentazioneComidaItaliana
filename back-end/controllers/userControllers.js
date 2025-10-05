const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

class userController {

    //Cadastrar Usuário
    static async cadastrar(req, res) {
        console.log(req.body);
        const { nome, email, senha } = req.body;

        const salt = bcryptjs.genSaltSync(8);
        const hashSenha = bcryptjs.hashSync(senha, salt);

        const user = await client.user.create({
            data: {
                nome,
                email,
                senha: hashSenha,
            },
        });

        res.json({
            userId: user.id,
        });
    }

    //Login
    static async login(req, res) {
        const { email, senha } = req.body;

        const user = await client.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.json({
                msg: "Usuário não encontrado.",
            });
        }

        const senhaCorreta = bcryptjs.compareSync(senha, user.senha);

        if (!senhaCorreta) {
            return res.json({
                msg: "Senha incorreta.",
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.SENHA_SERVIDOR,
            { expiresIn: "1h" }
        );

        res.json({
            msg: "Autenticado com sucesso!",
            token: token,
        });
    }

    //Verificar Autenticação
    static async verificarAuth(req, res, next) {
        const authHeader = req.headers["authorization"];

        if (authHeader) {
            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) => {
                if (err) {
                    return res.json({
                        msg: "Token inválido.",
                    });
                }

                req.userId = payload.id;
                next();
            });

        } else {
            return res.json({
                msg: "Token não encontrado.",
            });
        }
    }

    //Verificar Status de Administrador
    static async verificarAdminStatus(req, res, next) {
        if (!req.userId) {
            return res.json({
                msg: "Você não está autenticado.",
            });
        }

        const user = await client.user.findUnique({
            where: {
                id: req.userId,
            },
        });

        if (!user.adminStatus) {
            return res.json({
                msg: "Acesso negado. Usuário não possui privilégios de administrador.",
            });
        }

        next();
    }
}

module.exports = userController;
