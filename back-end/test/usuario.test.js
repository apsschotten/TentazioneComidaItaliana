const request = require("supertest");
const express = require("express");
const usuarioRoutes = require("../routes/usuarioRoutes");

const app = express();
app.use(express.json());
app.use("/usuario", usuarioRoutes);

describe("Testes de Usuário ", () => {
  it("Deve cadastrar um usuário", async () => {
    const res = await request(app)
      .post("/usuario/cadastrar")
      .send({
        nome: "Henrique Teste",
        email: "henriqueteste@example.com",
        senha: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("usuarioId");
    expect(res.body.message).toBe("Usuário cadastrado com sucesso!");
  });

  it("Deve fazer login com sucesso", async () => {
    const res = await request(app)
      .post("/usuario/login")
      .send({
        email: "henriqueteste@example.com",
        senha: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("usuarioId");
    expect(res.body.message).toBe("Login realizado com sucesso!");
  });

  it("Não deve logar com senha errada", async () => {
    const res = await request(app)
      .post("/usuario/login")
      .send({
        email: "henriqueteste@example.com",
        senha: "senhaErrada",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Senha incorreta");
  });

  it("Não deve logar com email inexistente", async () => {
    const res = await request(app)
      .post("/usuario/login")
      .send({
        email: "inexistente@example.com",
        senha: "123456",
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Usuário não encontrado");
  });
});
