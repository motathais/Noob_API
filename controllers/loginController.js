const Usuarios = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'fallback_secret_key';

const loginController = {
  post: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ msg: 'Email não informado.' });
      }

      const usuario = await Usuarios.findOne({ email });

      if (!usuario) {
        // Cria um novo usuário com dados básicos
        const novoUsuario = new Usuarios({
          email,
          apelido: null,
          nome: null,
          nascimento: null,
        });

        await novoUsuario.save();

        return res.status(200).json({
          apelidoFaltando: true,
          msg: 'Usuário criado, apelido ainda não definido.',
        });
      }

      if (!usuario.apelido) {
        return res.status(200).json({
          apelidoFaltando: true,
          msg: 'Usuário existente, mas apelido não definido.',
        });
      }

      const token = jwt.sign({ id: usuario._id }, secret, { expiresIn: '12h' });

      return res.status(200).json({
        token,
        usuario: {
          id: usuario._id,
          fontOption: usuario.fontOption,
          fontSize: usuario.fontSize,
          theme: usuario.theme,
        },
        msg: 'Login realizado com sucesso!',
      });
    } catch (error) {
      console.error('Erro no login com Google:', error);
      return res.status(500).json({ msg: 'Erro interno no servidor.' });
    }
  },
};

module.exports = loginController;
