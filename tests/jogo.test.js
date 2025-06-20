const jogoController = require('../controllers/jogoController');
const { Jogo: JogoModel } = require('../models/Jogo');
const cloudinary = require('../cloudinary/cloudinary');

jest.mock('../models/Jogo');
jest.mock('../cloudinary/cloudinary');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe('jogoController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('deve criar um jogo com sucesso (sem imagem)', async () => {
      const req = {
        body: {
          nome: 'Catan',
          ano: 2000,
          idade: 10,
          designer: 'Klaus',
          artista: 'Fulano',
          editora: 'Devir',
          digital: false,
          categoria: 'estratégia',
          componentes: ['cartas'],
          descricao: 'Jogo legal',
          idOriginal: null
        },
        files: {}
      };
      const res = mockResponse();

      const saveMock = jest.fn().mockResolvedValue();
      JogoModel.mockImplementation(() => ({ save: saveMock }));

      await jogoController.create(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        msg: 'Jogo criado com sucesso!'
      }));
    });

    it('deve retornar erro 500 ao falhar', async () => {
      const req = { body: {}, files: {} };
      const res = mockResponse();

      JogoModel.mockImplementation(() => ({ save: () => { throw new Error(); } }));

      await jogoController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getAll', () => {
    it('deve retornar todos os jogos', async () => {
      const req = {};
      const res = mockResponse();
      const jogos = [{ nome: 'Catan' }];

      JogoModel.find.mockResolvedValue(jogos);

      await jogoController.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(jogos);
    });
  });

  describe('get', () => {
    it('deve retornar um jogo existente', async () => {
      const req = { params: { id: '1' } };
      const res = mockResponse();
      const jogo = { nome: 'Catan' };

      JogoModel.findById.mockResolvedValue(jogo);

      await jogoController.get(req, res);

      expect(res.json).toHaveBeenCalledWith(jogo);
    });

    it('deve retornar 404 se não encontrar o jogo', async () => {
      const req = { params: { id: '1' } };
      const res = mockResponse();

      JogoModel.findById.mockResolvedValue(null);

      await jogoController.get(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Jogo não encontrado!' });
    });
  });

  describe('delete', () => {
    it('deve excluir um jogo existente', async () => {
      const req = { params: { id: '1' } };
      const res = mockResponse();

      const jogo = { nome: 'Catan' };

      JogoModel.findById.mockResolvedValue(jogo);
      JogoModel.findByIdAndDelete.mockResolvedValue(jogo);

      await jogoController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        msg: 'Jogo excluido com sucesso!'
      }));
    });

    it('deve retornar 404 se jogo não existir', async () => {
      const req = { params: { id: '1' } };
      const res = mockResponse();

      JogoModel.findById.mockResolvedValue(null);

      await jogoController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('update', () => {
    it('deve atualizar um jogo com sucesso', async () => {
      const req = {
        params: { id: '1' },
        body: {
          nome: 'Catan Atualizado',
          ano: 2001,
          idade: 12,
          designer: 'Klaus',
          artista: 'Fulano',
          editora: 'Galápagos',
          digital: false,
          categoria: 'estratégia',
          componentes: ['cartas'],
          descricao: 'Novo texto'
        },
        files: {}
      };
      const res = mockResponse();

      const updatedJogo = { _id: '1', nome: 'Catan Atualizado' };

      JogoModel.findByIdAndUpdate.mockResolvedValue(updatedJogo);

      await jogoController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        jogo: updatedJogo,
        msg: 'Jogo atualizado com sucesso!'
      });
    });

    it('deve retornar 404 caso não encontre o jogo', async () => {
      const req = { params: { id: '1' }, body: {}, files: {} };
      const res = mockResponse();

      JogoModel.findByIdAndUpdate.mockResolvedValue(null);

      await jogoController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
