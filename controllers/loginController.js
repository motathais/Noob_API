const Usuarios = require("../models/Usuario");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Utilize a variável de ambiente para armazenar a chave secreta
const secret = process.env.SECRET || 'fallback_secret_key';

const loginController = {

    post: async (req, res) => {
        try {
            const { apelido, senha } = req.body;

            // Verifica se o apelido e a senha foram fornecidos
            if (!apelido || !senha) {
                return res.status(400).json({ msg: 'Por favor, preencha as informações para login!' });
            }

            const usuario = await Usuarios.findOne({ apelido });

            // Verifica se o usuário existe no banco de dados
            if (!usuario) {
                return res.status(404).json({ msg: 'Nome de usuário ou senha inválido!' });
            }

            // Verifica se a senha está correta
            const confereSenha = await bcrypt.compare(senha, usuario.senha);

            if (!confereSenha) {
                return res.status(401).json({ msg: 'Nome de usuário ou senha inválido!' });
            }

            // Gera um token JWT válido por  horas
            const token = jwt.sign({ id: usuario._id }, secret, { expiresIn: '2h' });

            // Envia o token e as informações do usuário como resposta
            return res.status(200).json({
                token,
                usuario: {
                    id: usuario._id,
                    fontOption: usuario.fontOption,
                    fontSize: usuario.fontSize,
                    theme: usuario.theme
                },
                msg: "Usuário logado com sucesso!"
            });

        } catch (error) {
            return res.status(500).json({ msg: 'Erro interno no servidor. Tente novamente mais tarde.' });
        }
    }
};

module.exports = loginController;

