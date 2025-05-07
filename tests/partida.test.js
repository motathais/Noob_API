const partidaController = require('../controllers/partidaController');
const { Partida: PartidaModel, Partida } = require('../models/Partida');

jest.mock('../models/Partida');
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('partidaController', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar uma nova partida com sucesso', async () => {
      const req = {
        body: {
          usuarios: ['u1', 'u2'],
          jogo: 'jogo1',
          explicacao: 'explicação',
          inicio: '2024-05-06T12:00:00Z',
          registrador: 'registrador1',
        },
      };
      const res = mockResponse();

      PartidaModel.create.mockResolvedValue(req.body);

      await partidaController.create(req, res);

      expect(PartidaModel.create).toHaveBeenCalledWith({
        ...req.body,
        fim: '',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        response: req.body,
        msg: 'Partida registrada com sucesso!',
      });
    });
  });

  describe('getAll', () => {
    it('deve retornar todas as partidas', async () => {
      const partidas = [{ id: 1 }, { id: 2 }];
      PartidaModel.find.mockResolvedValue(partidas);
      const res = mockResponse();

      await partidaController.getAll({}, res);

      expect(res.json).toHaveBeenCalledWith(partidas);
    });
  });

  describe('get', () => {
    it('deve retornar partidas filtradas por registrador e fim', async () => {
      const partidas = [{ id: 1 }];
      const req = { query: { registrador: 'teste', fim: 'null' } };
      const res = mockResponse();

      PartidaModel.find.mockResolvedValue(partidas);

      await partidaController.get(req, res);

      expect(PartidaModel.find).toHaveBeenCalledWith({
        registrador: 'teste',
        $or: [{ fim: null }, { fim: '' }, { fim: { $exists: false } }],
      });
      expect(res.json).toHaveBeenCalledWith(partidas);
    });

    it('deve retornar 404 se nenhuma partida for encontrada', async () => {
      const req = { query: {} };
      const res = mockResponse();
      PartidaModel.find.mockResolvedValue([]);

      await partidaController.get(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        msg: 'Nenhuma partida encontrada com os critérios especificados.',
      });
    });
  });

  describe('delete', () => {
    it('deve excluir uma partida com sucesso', async () => {
      const req = { params: { id: '123' } };
      const res = mockResponse();

      PartidaModel.findById.mockResolvedValue({ _id: '123' });
      PartidaModel.findByIdAndDelete.mockResolvedValue({ _id: '123' });

      await partidaController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        deletedPartida: { _id: '123' },
        msg: 'Partida excluida com sucesso!',
      });
    });

    it('deve retornar 404 se a partida não for encontrada', async () => {
      const req = { params: { id: '123' } };
      const res = mockResponse();

      PartidaModel.findById.mockResolvedValue(null);

      await partidaController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Partida não encontrada!' });
    });
  });

  describe('update', () => {
    it('deve atualizar a partida com sucesso', async () => {
      const req = {
        params: { id: '1' },
        body: {
          fim: '2024-05-06T15:00:00Z',
          vencedor: 'u1',
          pontuacao: 10,
        },
      };
      const res = mockResponse();

      Partida.findById.mockResolvedValue({
        _id: '1',
        inicio: '2024-05-06T12:00:00Z',
      });
      Partida.findByIdAndUpdate.mockResolvedValue({
        _id: '1',
        fim: req.body.fim,
        vencedor: 'u1',
        pontuacao: 10,
        duracao: 3,
      });

      await partidaController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        partidaAtualizada: expect.objectContaining({
          fim: req.body.fim,
          vencedor: 'u1',
          pontuacao: 10,
          duracao: 3,
        }),
        msg: 'Partida atualizada com sucesso!',
      });
    });

    it('deve retornar erro 400 se fim for antes do início', async () => {
      const req = {
        params: { id: '1' },
        body: {
          fim: '2024-05-06T10:00:00Z',
        },
      };
      const res = mockResponse();

      Partida.findById.mockResolvedValue({
        _id: '1',
        inicio: '2024-05-06T12:00:00Z',
      });

      await partidaController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        msg: 'A data de fim deve ser posterior à data de início.',
      });
    });
  });

});
