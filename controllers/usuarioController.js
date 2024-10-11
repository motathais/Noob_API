const  Usuarios = require("../models/Usuario");
const cloudinary = require('../cloudinary/cloudinary');

const bcrypt = require('bcrypt');


const usuarioController={
    // função para criar usuário via POST
    create : async(req, res) => {
        try {
            
            // recebendo os parametros do body
            const {nome} = req.body;
            const {apelido} = req.body;
            const {nascimento} = req.body;
            const {email} = req.body;
            const {senha} = req.body;
            const {nivel} = req.body;
            let foto = req.file;

            // configurando hash de senha
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(senha, salt);

      // validando se usuário e apelido existem
      const usuarioExiste = await Usuarios.findOne({ email: email });
      const apelidoExiste = await Usuarios.findOne({ apelido: apelido });

      if (usuarioExiste) {
        return res.status(401).json({ message: "O email inserido está em uso, por gentileza utilize outro" });
      }

      if (apelidoExiste) {
        return res.status(401).json({ message: "O apelido inserido já está em uso, por gentileza utilize outro" });
      }

      // Upload da imagem para o Cloudinary
      let src;
      if (foto) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(foto.buffer);
        });
        src = result.secure_url;
      }

      // criando o usuario
      const usuarios = new Usuarios({
        nome,
        apelido,
        nascimento,
        email,
        senha: hash,
        nivel: 1,
        foto: src || null
      });

      // salvando o usuário
      await usuarios.save();

      res.status(200).json({ usuarios, message: "Usuário criado com sucesso!" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao processar a requisição." });
    }
  },
    // função para buscar todos os usuários da lista via GET
        getAll: async (req, res) => {
            try{
                const usuarios = await Usuarios.find()
    
                res.json(usuarios);
            }catch(error){
                console.log(error)
            }
        },
    // função para buscar apenas um usuário passando o ID via GET
        get: async(req,res) =>{
            try {
                //id => URL == GET
                const id = req.params.id
                const usuario = await Usuarios.findById(id, '-senha');
    
                if(!usuario){
                    res.status(404).json({msg: "Usuario não encontrado"});
                    return;
                }
    
                res.json(usuario);
    
            }catch(error) {
                console.log(error)
            }
        },
    // função para deletar o usuário passando ID via DELETE
        delete: async(req,res) => {
            try{
                const id = req.params.id;
    
                const usuario = await Usuarios.findById(id);
    
                if (!usuario){
                    res.status(404).json({ msg: "Usuário não encontrado!"});
                    return;
                }
    
            const deletedUsuario = await Usuarios.findByIdAndDelete(id);
    
            res
                .status(200)
                .json({ deletedUsuario, msg: "Usuário excluido com sucesso"});
    
            }catch (error){
                console.log(error)
            }
        },
    // atualizando o usuário passando o ID via PUT
        updateSenha : async(req,res) =>{
            const id = req.params.id
            
             const {senha} = req.body;
 
             // configurando hash de senha
             const salt = await bcrypt.genSalt(12);
             const hash = await bcrypt.hash(senha,salt);
    
            const usuario = {
                senha:hash,
            };
    
            const updatedSenha = await Usuarios.findByIdAndUpdate(id, usuario)
    
            if(!updatedSenha) {
                res.status(404).json({msg: "Usuário não encontrado."});
                return;
            }
    
             res.status(200).json({ msg: "Senha atualizada com sucesso!" });     
    
            },
            update : async(req,res) =>{
              const id = req.params.id
  
               // recebendo os parametros do body
               const {nome} = req.body;
               const {nascimento} = req.body;
               const {email} = req.body;
               let foto = req.file;
  
               // Upload da imagem para o Cloudinary
                let src;
                if (foto) {
                  const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                      if (error) reject(error);
                      else resolve(result);
                    }).end(foto.buffer);
                  });
                  src = result.secure_url;
                }
      
              const usuario = {
                  nome,
                  nascimento,
                  email,
                  foto: src || null
              };
      
              const updatedUsuario = await Usuarios.findByIdAndUpdate(id, usuario)
      
              if(!updatedUsuario) {
                  res.status(404).json({msg: "Usuário não encontrado."});
                  return;
              }
      
               res.status(200).json({ usuario, msg: "Usuário atualizado com sucesso!" });     
      
              },      
};


module.exports = usuarioController; 
