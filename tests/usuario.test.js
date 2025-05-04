const { create } = require('../controllers/usuarioController');
const Usuarios = require('../models/Usuario');
const cloudinary = require('../cloudinary/cloudinary');
const bcrypt = require('bcrypt');

jest.mock('../models/Usuario');
jest.mock('../cloudinary/cloudinary');
jest.mock('bcrypt');

describe('usuarioController.create (unitário)', () => {
  const mockRequest = (body = {}, files = {}) => ({
    body,
    files
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo usuário com sucesso', async () => {
    const req = mockRequest(
      {
        nome: 'Teste',
        apelido: 'testinho',
        nascimento: '2000-01-01',
        email: 'teste@email.com',
        senha: '123456',
        nivel: 1
      },
      {
        foto: [{ buffer: Buffer.from('fakeFoto') }],
        capa: [{ buffer: Buffer.from('fakeCapa') }]
      }
    );

    const res = mockResponse();

    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashed123');

    Usuarios.findOne
      .mockResolvedValueOnce(null) // email
      .mockResolvedValueOnce(null); // apelido

    cloudinary.uploader = {
      upload_stream: jest.fn((opts, cb) => {
        return {
          end: () => cb(null, { secure_url: 'https://cloud.fake/img.jpg' })
        };
      })
    };

    Usuarios.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(),
      toObject: () => ({
        nome: 'Teste',
        apelido: 'testinho',
        nascimento: '2000-01-01',
        email: 'teste@email.com',
        nivel: 1,
        foto: 'https://cloud.fake/img.jpg',
        capa: 'https://cloud.fake/img.jpg'
      })
    }));

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
        usuarios: expect.objectContaining({
          apelido: 'testinho',
          foto: 'https://cloud.fake/img.jpg'
        })
      })
    );
  });
});
