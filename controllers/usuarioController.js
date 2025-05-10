const Usuarios = require("../models/Usuario");
const cloudinary = require('../cloudinary/cloudinary');

const bcrypt = require('bcrypt');


const usuarioController = {
  create: async (req, res) => {
    try {
      const { nome, apelido, nascimento, email, senha } = req.body;
      const { foto, capa } = req.files;

      // configurando hash de senha
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(senha, salt);

      // validando se usuário e apelido já existem
      const usuarioExiste = await Usuarios.findOne({ email });
      const apelidoExiste = await Usuarios.findOne({ apelido });

      if (usuarioExiste) {
        return res.status(401).json({ message: "O email inserido está em uso, por gentileza utilize outro." });
      }

      if (apelidoExiste) {
        return res.status(401).json({ message: "O apelido inserido já está em uso, por gentileza utilize outro." });
      }

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

      // criando o usuário
      const usuarios = new Usuarios({
        nome,
        apelido,
        nascimento,
        email,
        senha: hash,
        nivel: 1,
        foto: foto_src || null,
        capa: capa_src || null,
        fontOption: "",
        fontSize: 1,
        theme: ""
      });

      // salvando o usuário
      await usuarios.save();

      const { senha: _, ...usuarioSemSenha } = usuarios.toObject();

      res.status(201).json({ usuarios: usuarioSemSenha, message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao processar a requisição." });
    }
  },
  // função para buscar todos os usuários da lista via GET
  getAll: async (req, res) => {
    try {
      // Exclui o campo 'senha' de todos os usuários
      const usuarios = await Usuarios.find({}, '-senha');

      res.json(usuarios);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar usuários." });
    }
  },
  // função para buscar apenas um usuário passando o ID via GET
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuarios.findById(id, '-senha'); // Exclui a senha

      if (!usuario) {
        res.status(404).json({ msg: "Usuário não encontrado" });
        return;
      }

      res.json(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao buscar o usuário." });
    }
  },
  // função para deletar o usuário passando ID via DELETE
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const usuario = await Usuarios.findById(id);

      if (!usuario) {
        res.status(404).json({ msg: "Usuário não encontrado!" });
        return;
      }

      const deletedUsuario = await Usuarios.findByIdAndDelete(id).select("-senha");

      res.status(200).json({
        deletedUsuario,
        msg: "Usuário excluído com sucesso"
      });


    } catch (error) {
      console.log(error)
    }
  },
  // atualizando o usuário passando o ID via PUT
  updateSenha: async (req, res) => {
    const id = req.params.id

    const { senha } = req.body;

    // configurando hash de senha
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(senha, salt);

    const usuario = {
      senha: hash,
    };

    const updatedSenha = await Usuarios.findByIdAndUpdate(id, usuario)

    if (!updatedSenha) {
      res.status(404).json({ msg: "Usuário não encontrado." });
      return;
    }

    res.status(200).json({ msg: "Senha atualizada com sucesso!" });

  },
   // atualizando preferencias de visualização do usuário passando o ID via PUT
    updatePreferences: async (req, res) => {
    const id = req.params.id

    const { fontOption , fontSize, theme } = req.body;

    const usuario = {
      fontOption,
      fontSize,
      theme
    };

    const updatedPreferences = await Usuarios.findByIdAndUpdate(id, usuario)

    if (!updatedPreferences) {
      res.status(404).json({ msg: "Usuário não encontrado." });
      return;
    }

    res.status(200).json({ msg: "Preferências atualizadas com sucesso!" });

  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      // recebendo os parâmetros do body
      const { nome, nascimento, email } = req.body;
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

      // Montando objeto com os campos atualizados
      const usuario = {
        nome,
        nascimento,
        email,
        foto: foto_src || undefined, // Atualiza somente se houve nova foto
        capa: capa_src || undefined,  // Atualiza somente se houve nova capa
      };

      // Atualizando o usuário   
      const updatedUsuario = await Usuarios.findByIdAndUpdate(id, usuario).select("-senha")


      if (!updatedUsuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      res.status(200).json({ updatedUsuario, msg: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Erro ao processar a atualização do usuário." });
    }
  },
};


module.exports = usuarioController; 
