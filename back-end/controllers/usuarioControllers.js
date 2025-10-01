import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

class usuarioController {

  static async cadastrar(req, res) {

    console.log(req.body);

    const { nome, email, senha } = req.body;

    const salt = genSaltSync(8);

    const hashSenha = hashSync(senha, salt);

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
    });

    if (!usuario) {
      return res.json({
        msg: "Usuário não encontrado.",
      });
    }

    const senhaCorreta = compareSync(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.json({
        msg: "Senha incorreta.",
      });
    }

    const token = sign({ id: usuario.id }, process.env.SENHA_SERVIDOR, { expiresIn: "1h" });
    res.json({
      msg: "Autenticado!",
      token: token,
    });
  }

  static async verificarAutenticacao(req, res, next) {

    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) => {
        if (err) {
          return res.json({
            msg: "Token inválido."
          });
        }
        req.usuarioId = payload.id;
        next();
      });
    } else {
      res.json({
        msg: "Token não encontrado."
      });
    }
  }

  static async verificarStatus(req, res, next) {
    if (!req.usuarioId) {
      res.json({
        msg: "Usuário não autenticado."
      });
    }

    const usuario = await client.usuario.findUnique({
      where: {
        id: req.usuarioId,
      },
    });

    if (!usuario.adminStatus) {
      res.json({
        msg: "Acesso negado. Usuário sem privilégios de administrador."
      });
    }

    next();
  }
}

export default usuarioController