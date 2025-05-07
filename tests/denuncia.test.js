const denunciaController = require('../controllers/denunciaController');
const { Denuncia: DenunciaModel } = require('../models/Denuncia');

jest.mock('../models/Denuncia');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

describe('denunciaController', () => {
  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('deve criar uma denúncia com sucesso', async () => {
      const req = {
        body: {
          idRegistro: '123',
          descricao: 'Conteúdo impróprio'
        }
      };
      const res = mockResponse();

      const denunciaCriada = {
        _id: 'abc',
        idRegistro: '123',
        descricao: 'Conteúdo impróprio'
      };

      DenunciaModel.create.mockResolvedValue(denunciaCriada);

      await denunciaController.create(req, res);

      expect(DenunciaModel.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        response: denunciaCriada,
        msg: 'Denúncia registrada com sucesso!'
      });
    });
  });

  describe('getAll', () => {
    it('deve retornar todas as denúncias', async () => {
      const req = {};
      const res = mockResponse();
      const denuncias = [{ descricao: 'Fake' }, { descricao: 'Spam' }];

      DenunciaModel.find.mockResolvedValue(denuncias);

      await denunciaController.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith(denuncias);
    });
  });

  describe('get', () => {
    it('deve retornar uma denúncia existente', async () => {
      const req = { params: { id: 'abc' } };
      const res = mockResponse();
      const denuncia = { idRegistro: '123', descricao: 'Spam' };

      DenunciaModel.findById.mockResolvedValue(denuncia);

      await denunciaController.get(req, res);

      expect(res.json).toHaveBeenCalledWith(denuncia);
    });

    it('deve retornar 404 se a denúncia não existir', async () => {
      const req = { params: { id: 'abc' } };
      const res = mockResponse();

      DenunciaModel.findById.mockResolvedValue(null);

      await denunciaController.get(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Denúncia não encontrada!' });
    });
  });

  describe('delete', () => {
    it('deve excluir uma denúncia existente', async () => {
      const req = { params: { id: 'abc' } };
      const res = mockResponse();
      const denuncia = { _id: 'abc' };

      DenunciaModel.findById.mockResolvedValue(denuncia);
      DenunciaModel.findByIdAndDelete.mockResolvedValue(denuncia);

      await denunciaController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        deletedDenuncia: denuncia,
        msg: 'Denúncia excluída com sucesso!'
      });
    });

    it('deve retornar 404 se a denúncia não existir', async () => {
      const req = { params: { id: 'abc' } };
      const res = mockResponse();

      DenunciaModel.findById.mockResolvedValue(null);

      await denunciaController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Denúncia não encontrada!' });
    });
  });

  describe('update', () => {
    it('deve atualizar uma denúncia com sucesso', async () => {
      const req = {
        params: { id: 'abc' },
        body: {
          idRegistro: '456',
          descricao: 'Atualizado'
        }
      };
      const res = mockResponse();

      const updatedDenuncia = {
        _id: 'abc',
        idRegistro: '456',
        descricao: 'Atualizado'
      };

      DenunciaModel.findByIdAndUpdate.mockResolvedValue(updatedDenuncia);

      await denunciaController.update(req, res);

      expect(DenunciaModel.findByIdAndUpdate).toHaveBeenCalledWith('abc', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        denuncia: req.body,
        msg: 'Denúncia atualizada com sucesso!'
      });
    });

    it('deve retornar 404 se a denúncia não for encontrada', async () => {
      const req = {
        params: { id: 'abc' },
        body: { idRegistro: '789', descricao: 'Atualização' }
      };
      const res = mockResponse();

      DenunciaModel.findByIdAndUpdate.mockResolvedValue(null);

      await denunciaController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Denúncia não encontrada!' });
    });
  });
});
