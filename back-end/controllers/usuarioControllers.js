const path = require("path");

const {prismaclient} = require("@prisma/client");
const client = new prismaclient();

class usuariocontroller {
     static async cadastrar(req, res) {
        
        console.log(req.body);

        const { nome, email, senha } = req.body;


       const usuario = await client.usuario.create({
            data: {
                nome,
                email,
                senha: hashSenha,
            },
        });

        res.json({
            usuarioId: usuario.id,
        });

    }

    static async login(req, res) {
        const { email, senha } = req.body;

        const usuario = await client.usuario.findUnique({
            where: {
                email: email,
            },
        },
    )
    }
}

module.exports = path;