import request from "supertest";
import app from "../app";

test("Cadastro de Usuário", async () => {
    const res = await request(app)
        .post("/usuario/cadastrar")
        .send({ nome: "Feliciano Vargas", email: "feli.vargas@tentazione.com", senha: "Admin123" });

    expect(res.body).toHaveProperty("usuarioId");
});

test("Login: Usuário Válido", async () => {
    const res = await request(app)
        .post("/usuario/login")
        .send({ email: "feli.vargas@tentazione.com", senha: "Admin123" });

    expect(res.body).toHaveProperty("token");
    token = res.body.token;
})

test("Login: E-mail Inválido", async () => {
    const res = await request(app)
        .post("/usuario/login")
        .send({ email: "feliciano.vargas@tentazione.com", senha: "Admin123" });

    expect(res.body.msg).toBe("Usuário não encontrado.");
})

test("Login: Senha Inválida", async () => {
    const res = await request(app)
        .post("/usuario/login")
        .send({ email: "feli.vargas@tentazione.com", senha: "Admin1234" });

    expect(res.body.msg).toBe("Senha incorreta.");
})