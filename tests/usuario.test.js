// Imports e Mocks
const { create } = require('../controllers/usuarioController');
const { getAll, get, delete: deleteUsuario, update } = require('../controllers/usuarioController');
const Usuarios = require('../models/Usuario');
const cloudinary = require('../cloudinary/cloudinary');
const bcrypt = require('bcrypt');

jest.mock('../models/Usuario');
jest.mock('bcrypt');
jest.mock('../cloudinary/cloudinary', () => ({
  uploader: {
    upload_stream: jest.fn()
  }
}));

// Helpers
const mockRequest = (body = {}, files = {}) => ({ body, files });

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

function mockUploadStream(resultUrl) {
  cloudinary.uploader.upload_stream.mockImplementation((options, callback) => {
    return { end: () => callback(null, { secure_url: resultUrl }) };
  });
}

// Testes
describe('usuarioController (unitário)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // CREATE
  describe('create', () => {
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
        upload_stream: jest.fn((opts, cb) => ({
          end: () => cb(null, { secure_url: 'https://cloud.fake/img.jpg' })
        }))
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
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String),
        usuarios: expect.objectContaining({
          apelido: 'testinho',
          foto: 'https://cloud.fake/img.jpg'
        })
      }));
    });
  });

  // GET ALL
  describe('getAll', () => {
    it('deve retornar todos os usuários sem senha', async () => {
      const mockUsers = [
        { _id: '1', nome: 'Usuário 1' },
        { _id: '2', nome: 'Usuário 2' }
      ];
      Usuarios.find.mockResolvedValue(mockUsers);
      const req = {};
      const res = mockResponse();

      await getAll(req, res);

      expect(Usuarios.find).toHaveBeenCalledWith({}, '-senha');
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('deve retornar erro 500 ao falhar na busca', async () => {
      Usuarios.find.mockRejectedValue(new Error('Erro ao buscar'));
      const req = {};
      const res = mockResponse();

      await getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao buscar usuários.' });
    });
  });

  // GET BY ID
  describe('get', () => {
    it('deve retornar um usuário específico sem senha', async () => {
      const mockUser = { _id: '123', nome: 'Teste' };
      Usuarios.findById.mockResolvedValue(mockUser);
      const req = { params: { id: '123' } };
      const res = mockResponse();

      await get(req, res);

      expect(Usuarios.findById).toHaveBeenCalledWith('123', '-senha');
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('deve retornar 404 se usuário não encontrado', async () => {
      Usuarios.findById.mockResolvedValue(null);
      const req = { params: { id: 'invalido' } };
      const res = mockResponse();

      await get(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Usuário não encontrado' });
    });

    it('deve retornar erro 500 ao falhar', async () => {
      Usuarios.findById.mockRejectedValue(new Error('Erro interno'));
      const req = { params: { id: '123' } };
      const res = mockResponse();

      await get(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao buscar o usuário.' });
    });
  });

  // DELETE
  describe('delete', () => {
    it('deve deletar usuário com sucesso', async () => {
      const mockUser = { _id: '123', nome: 'Para excluir' };

      Usuarios.findById.mockResolvedValue(mockUser);
      Usuarios.findByIdAndDelete.mockReturnValue({
        select: jest.fn().mockReturnValue(mockUser)
      });

      const req = { params: { id: '123' } };
      const res = mockResponse();

      await deleteUsuario(req, res);

      expect(Usuarios.findById).toHaveBeenCalledWith('123');
      expect(Usuarios.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        deletedUsuario: mockUser,
        msg: 'Usuário excluído com sucesso'
      });
    });

    it('deve retornar 404 se usuário não encontrado', async () => {
      Usuarios.findById.mockResolvedValue(null);
      const req = { params: { id: 'invalido' } };
      const res = mockResponse();

      await deleteUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Usuário não encontrado!' });
    });

    it('deve capturar erro interno', async () => {
      Usuarios.findById.mockRejectedValue(new Error('Erro interno'));
      const req = { params: { id: '123' } };
      const res = mockResponse();

      await deleteUsuario(req, res);

      expect(res.status).not.toHaveBeenCalledWith(200);
    });
  });

  // UPDATE
  describe('update', () => {
    it('deve atualizar o usuário com nova foto e capa', async () => {
      const req = {
        params: { id: '123' },
        body: {
          nome: 'Atualizado',
          nascimento: '1990-01-01',
          email: 'novo@email.com'
        },
        files: {
          foto: [{ buffer: Buffer.from('foto') }],
          capa: [{ buffer: Buffer.from('capa') }]
        }
      };
      const res = mockResponse();

      const updatedUsuarioMock = {
        _id: '123',
        nome: 'Atualizado',
        nascimento: '1990-01-01',
        email: 'novo@email.com',
        foto: 'https://cloudinary.com/foto.jpg',
        capa: 'https://cloudinary.com/capa.jpg'
      };

      mockUploadStream('https://cloudinary.com/foto.jpg');
      mockUploadStream('https://cloudinary.com/capa.jpg');

      Usuarios.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockReturnValue(updatedUsuarioMock)
      });

      await update(req, res);

      expect(cloudinary.uploader.upload_stream).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        updatedUsuario: updatedUsuarioMock,
        msg: "Usuário atualizado com sucesso!"
      });
    });

    it('deve atualizar o usuário sem foto e capa', async () => {
      const req = {
        params: { id: '123' },
        body: {
          nome: 'Sem imagem',
          nascimento: '1980-12-12',
          email: 'sem@imagem.com'
        },
        files: {}
      };
      const res = mockResponse();

      const updatedUsuarioMock = {
        _id: '123',
        nome: 'Sem imagem',
        nascimento: '1980-12-12',
        email: 'sem@imagem.com'
      };

      Usuarios.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockReturnValue(updatedUsuarioMock)
      });

      await update(req, res);

      expect(cloudinary.uploader.upload_stream).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        updatedUsuario: updatedUsuarioMock,
        msg: "Usuário atualizado com sucesso!"
      });
    });

    it('deve retornar 404 se usuário não for encontrado', async () => {
      const req = {
        params: { id: '999' },
        body: {
          nome: 'Inexistente',
          nascimento: '2000-01-01',
          email: 'x@x.com'
        },
        files: {}
      };
      const res = mockResponse();

      Usuarios.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockReturnValue(null)
      });

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: "Usuário não encontrado." });
    });

    it('deve capturar erro interno', async () => {
      const req = {
        params: { id: 'erro' },
        body: {
          nome: 'Erro',
          nascimento: '1999-01-01',
          email: 'erro@erro.com'
        },
        files: undefined
      };
      const res = mockResponse();

      Usuarios.findByIdAndUpdate.mockRejectedValue(new Error('Erro de teste'));

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: "Erro ao processar a atualização do usuário." });
    });
  });
});

