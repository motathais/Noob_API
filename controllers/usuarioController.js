const Usuarios = require('../models/Usuario');
const cloudinary = require('../cloudinary/cloudinary');

const usuarioController = {
  // Definir apelido e completar cadastro do usuário após login Google
  updateApelido: async (req, res) => {
    try {
      const { nome, apelido, nascimento, email } = req.body;
      const { foto, capa } = req.files;

      if (!email || !apelido || !nome || !nascimento) {
        return res.status(400).json({ msg: 'Campos obrigatórios ausentes.' });
      }

      const usuario = await Usuarios.findOne({ email });

      if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado com este email.' });
      }

      // Validação do apelido
      const apelidoNormalizado = `@${apelido.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`;
      const apelidoEmUso = await Usuarios.findOne({
        apelido: { $regex: `^${apelidoNormalizado}$`, $options: 'i' },
        _id: { $ne: usuario._id },
      });

      if (apelidoEmUso) {
        return res.status(409).json({ msg: 'Este apelido já está em uso.' });
      }

      // Upload da foto
      let foto_src;
      if (foto) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(foto[0].buffer);
        });
        foto_src = result.secure_url;
      }

      // Upload da capa
      let capa_src;
      if (capa) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(capa[0].buffer);
        });
        capa_src = result.secure_url;
      }

      usuario.nome = nome;
      usuario.nascimento = nascimento;
      usuario.apelido = apelidoNormalizado;
      usuario.foto = foto_src || usuario.foto;
      usuario.capa = capa_src || usuario.capa;
      usuario.fontOption = usuario.fontOption || 'arial';
      usuario.fontSize = usuario.fontSize || 1;
      usuario.theme = usuario.theme || 'light';

      await usuario.save();

      const { senha, ...usuarioSemSenha } = usuario.toObject();

      res.status(200).json({
        usuario: usuarioSemSenha,
        msg: 'Apelido e dados atualizados com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao completar cadastro:', error);
      res.status(500).json({ msg: 'Erro ao completar cadastro do usuário.' });
    }
  },

  // Busca todos os usuários
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuarios.find({}, '-senha');
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao buscar usuários.' });
    }
  },

  // Busca um único usuário
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuarios.findById(id, '-senha');
      if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado.' });
      }
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao buscar o usuário.' });
    }
  },

  // Atualizar preferências visuais
  updatePreferences: async (req, res) => {
    const id = req.params.id;
    const { fontOption, fontSize, theme } = req.body;

    const usuario = { fontOption, fontSize, theme };

    const updated = await Usuarios.findByIdAndUpdate(id, usuario);
    if (!updated) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    res.status(200).json({ msg: 'Preferências atualizadas com sucesso!' });
  },

  // Deletar usuário
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuarios.findById(id);
      if (!usuario) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' });
      }
      const deleted = await Usuarios.findByIdAndDelete(id).select('-senha');
      res.status(200).json({ deletedUsuario: deleted, msg: 'Usuário excluído com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao excluir usuário.' });
    }
  },
};

module.exports = usuarioController;
