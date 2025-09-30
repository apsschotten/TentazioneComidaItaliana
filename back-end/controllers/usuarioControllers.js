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

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await client.usuario.findUnique({
        where: { email },
      });

      if (!usuario) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

     
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      
      res.json({
        usuarioId: usuario.id,
        message: "Login realizado com sucesso!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  }
}

module.exports = usuarioController;
