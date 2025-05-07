const avaliacaoController = require('../controllers/avaliacaoController');
const { Avaliacao: AvaliacaoModel } = require('../models/Avaliacao');

jest.mock('../models/Avaliacao');

const httpMocks = require('node-mocks-http');

describe('avaliacaoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma nova avaliação e retornar status 201', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        body: {
          usuario: 'usuario1',
          jogo: 'jogo1',
          beleza: 4,
          divertimento: 5,
          duracao: 3,
          preco: 4,
          armazenamento: 5
        }
      });
      const res = httpMocks.createResponse();
      const mockResponse = { _id: '1', ...req.body, nota: 4.2 };

      AvaliacaoModel.create.mockResolvedValue(mockResponse);

      await avaliacaoController.create(req, res);

      expect(AvaliacaoModel.create).toHaveBeenCalledWith({
        ...req.body,
        nota: 4.2
      });
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        response: mockResponse,
        msg: 'Avaliação registrada com sucesso!'
      });
    });
  });

  describe('getAll', () => {
    it('deve retornar todas as avaliações', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const mockAvaliacoes = [{ _id: '1' }, { _id: '2' }];

      AvaliacaoModel.find.mockResolvedValue(mockAvaliacoes);

      await avaliacaoController.getAll(req, res);

      expect(AvaliacaoModel.find).toHaveBeenCalled();
      expect(res._getJSONData()).toEqual(mockAvaliacoes);
    });
  });

  describe('get', () => {
    it('deve retornar uma avaliação específica por id', async () => {
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      const mockAvaliacao = { _id: '1', jogo: 'Jogo X' };

      AvaliacaoModel.findById.mockResolvedValue(mockAvaliacao);

      await avaliacaoController.get(req, res);

      expect(AvaliacaoModel.findById).toHaveBeenCalledWith('1');
      expect(res._getJSONData()).toEqual(mockAvaliacao);
    });

    it('deve retornar 404 se avaliação não encontrada', async () => {
      const req = httpMocks.createRequest({ params: { id: '999' } });
      const res = httpMocks.createResponse();

      AvaliacaoModel.findById.mockResolvedValue(null);

      await avaliacaoController.get(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ msg: 'Avaliação não encontrada!' });
    });
  });

  describe('delete', () => {
    it('deve excluir uma avaliação existente', async () => {
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      const mockAvaliacao = { _id: '1' };

      AvaliacaoModel.findById.mockResolvedValue(mockAvaliacao);
      AvaliacaoModel.findByIdAndDelete.mockResolvedValue(mockAvaliacao);

      await avaliacaoController.delete(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        deletedAvaliacao: mockAvaliacao,
        msg: 'Avaliação excluida com sucesso!'
      });
    });

    it('deve retornar 404 se a avaliação não existir', async () => {
      const req = httpMocks.createRequest({ params: { id: '999' } });
      const res = httpMocks.createResponse();

      AvaliacaoModel.findById.mockResolvedValue(null);

      await avaliacaoController.delete(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ msg: 'Avaliação não encontrada!' });
    });
  });

  describe('update', () => {
    it('deve atualizar uma avaliação existente', async () => {
      const req = httpMocks.createRequest({
        params: { id: '1' },
        body: {
          usuario: 'usuario1',
          jogo: 'jogo1',
          beleza: 3,
          divertimento: 4,
          duracao: 3,
          preco: 4,
          armazenamento: 5
        }
      });
      const res = httpMocks.createResponse();

      const updatedAvaliacao = { ...req.body, nota: 3.8 };

      AvaliacaoModel.findByIdAndUpdate.mockResolvedValue(updatedAvaliacao);

      await avaliacaoController.update(req, res);

      expect(AvaliacaoModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { ...req.body, nota: 3.8 },
        { new: true }
      );
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        updatedAvaliacao,
        msg: 'Avaliação atualizada com sucesso!'
      });
    });

    it('deve retornar 404 se a avaliação não for encontrada', async () => {
      const req = httpMocks.createRequest({ params: { id: '999' }, body: {} });
      const res = httpMocks.createResponse();

      AvaliacaoModel.findByIdAndUpdate.mockResolvedValue(null);

      await avaliacaoController.update(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ msg: 'Avaliação não encontrada!' });
    });
  });
});






