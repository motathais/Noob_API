const { Jogo: JogoModel, Jogo } = require("../models/Jogo");
const cloudinary = require('../cloudinary/cloudinary');

const jogoController = {

  create: async (req, res) => {
    try {
      // recebendo os parâmetros do body
      const { nome, ano, idade, designer, artista, editora, digital, categoria, componentes, descricao, idOriginal } = req.body;
      const { foto, capa } = req.files; // Recebendo múltiplos arquivos

      // Upload da foto para o Cloudinary
      let foto_src;
      if (foto) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(foto[0].buffer); // Acessa o primeiro arquivo 'foto'
        });
        foto_src = result.secure_url;
      }

      // Upload da capa para o Cloudinary
      let capa_src;
      if (capa) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(capa[0].buffer); // Acessa o primeiro arquivo 'capa'
        });
        capa_src = result.secure_url;
      }

      // Criando o jogo
      const jogos = new Jogo({
        nome,
        ano,
        idade,
        designer,
        artista,
        editora,
        digital,
        categoria,
        componentes,
        descricao,
        idOriginal,
        foto: foto_src || null,
        capa: capa_src || null
      });

      // Salvando o jogo
      await jogos.save();

      res.status(201).json({ jogos, msg: "Jogo criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao criar o jogo." });
    }
  },
  getAll: async (req, res) => {
    try {
      const jogos = await JogoModel.find()

      res.json(jogos);
    } catch (error) {
      console.log(error)
    }
  },
  get: async (req, res) => {
    try {
      //id => URL == GET
      const id = req.params.id
      const jogo = await JogoModel.findById(id);

      if (!jogo) {
        res.status(404).json({ msg: "Jogo não encontrado!" });
        return;
      }

      res.json(jogo);

    } catch (error) {
      console.log(error)
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const jogo = await JogoModel.findById(id);

      if (!jogo) {
        res.status(404).json({ msg: "Jogo não encontrado!" });
        return;
      }

      const deletedJogo = await JogoModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedJogo, msg: "Jogo excluido com sucesso!" });

    } catch (error) {
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      // recebendo os parâmetros do body
      const { nome, ano, idade, designer, artista, editora, digital, categoria, componentes, descricao } = req.body;
      const { foto, capa } = req.files; // Recebendo múltiplos arquivos

      // Criando o objeto de atualização
      const jogo = {
        nome,
        ano,
        idade,
        designer,
        artista,
        editora,
        digital,
        categoria,
        componentes,
        descricao,
      };

      // Upload da foto para o Cloudinary
      if (foto) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(foto[0].buffer); // Acessa o primeiro arquivo 'foto'
        });
        jogo.foto = result.secure_url;
      }

      // Upload da capa para o Cloudinary
      if (capa) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(capa[0].buffer); // Acessa o primeiro arquivo 'capa'
        });
        jogo.capa = result.secure_url;
      }

      // Atualizando o jogo no banco de dados
      const updatedJogo = await Jogo.findByIdAndUpdate(id, jogo, { new: true });

      if (!updatedJogo) {
        return res.status(404).json({ msg: "Jogo não encontrado!" });
      }

      res.status(200).json({ jogo: updatedJogo, msg: "Jogo atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao atualizar o jogo." });
    }
  },
};


module.exports = jogoController;
