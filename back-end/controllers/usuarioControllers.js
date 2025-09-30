const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

class usuarioController {
  static async cadastrar(req, res) {
    try {
      console.log(req.body);

      const { nome, email, senha } = req.body;

      const hashSenha = await bcrypt.hash(senha, 10);

      const usuario = await client.usuario.create({
        data: {
          nome,
          email,
          senha: hashSenha,
        },
      });

      res.json({
        usuarioId: usuario.id,
        message: "Usuário cadastrado com sucesso!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  }
}

module.exports = usuarioController;
