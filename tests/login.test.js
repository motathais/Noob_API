const request = require('supertest');
process.env.NODE_ENV = 'test';
const app = require('../app');
const Usuarios = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/Usuario');
jest.mock('bcrypt');

describe('POST /api/login', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar 400 se apelido ou senha estiverem ausentes', async () => {
    const res = await request(app).post('/api/login').send({ apelido: '', senha: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toMatch(/preencha as informações/i);
  });

  it('deve retornar 404 se usuário não for encontrado', async () => {
    Usuarios.findOne.mockResolvedValue(null);

    const res = await request(app).post('/api/login').send({ apelido: 'teste', senha: '123' });

    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toMatch(/inválido/i);
  });

  it('deve retornar 401 se a senha estiver incorreta', async () => {
    Usuarios.findOne.mockResolvedValue({ apelido: 'teste', senha: 'senha_hash', _id: '123' });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app).post('/api/login').send({ apelido: 'teste', senha: 'errada' });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toMatch(/inválido/i);
  });

  it('deve retornar 200 e um token se login for bem-sucedido', async () => {
    const fakeUser = { _id: '123', apelido: 'teste', senha: 'senha_hash' };

    Usuarios.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    const tokenSpy = jest.spyOn(jwt, 'sign').mockReturnValue('fake_token');

    const res = await request(app).post('/api/login').send({ apelido: 'teste', senha: '123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token', 'fake_token');
    expect(res.body).toHaveProperty('usuario');
    expect(res.body.usuario).toHaveProperty('id', '123');
    expect(res.body.msg).toMatch(/sucesso/i);

    tokenSpy.mockRestore();
  });

  it('deve retornar 500 se ocorrer erro inesperado', async () => {
    Usuarios.findOne.mockRejectedValue(new Error('Erro DB'));

    const res = await request(app).post('/api/login').send({ apelido: 'teste', senha: '123' });

    expect(res.statusCode).toBe(500);
    expect(res.body.msg).toMatch(/erro interno/i);
  });

});
