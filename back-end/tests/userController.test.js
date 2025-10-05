const request = require('supertest');
const app = require('../index')

test('Cadastro de Usuário', async () => {
  const res = await request(app)
    .post('/user/cadastrar')
    .send({ nome: 'Feliciano Vargas', email: 'feli.vargas@tentazione.com', senha: 'ItaliaForever123' });
  expect(res.body).toHaveProperty('userId');
});

test('Login: Email Incorreto', async () => {
  const res = await request(app)
    .post('/user/login')
    .send({ email: 'feliciano.vargas@tentazione.com', senha: 'ItaliaForever123' });
  expect(res.body.msg).toBe('Usuário não encontrado.');
});

test('Login: Senha Incorreta', async () => {
  const res = await request(app)
    .post('/user/login')
    .send({ email: 'feli.vargas@tentazione.com', senha: 'ItaliaForever1234' });
  expect(res.body.msg).toBe('Senha incorreta.');
});

test('Login Correto', async () => {
  const res = await request(app)
    .post('/user/login')
    .send({ email: 'feli.vargas@tentazione.com', senha: 'ItaliaForever123' });
  expect(res.body.msg).toBe('Autenticado com sucesso!');
});
