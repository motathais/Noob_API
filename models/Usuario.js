const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({

    nome: {
        type: String,
        required: true
    },
    apelido: {
        type: String,
        required: true
    },
    nascimento: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
    },
    foto: {
        type: String,
    },
    capa: {
        type: String,
    },
    fontOption: {
         type: String,
    },
    fontSize:
    {
        type: Number,
    },
    theme:{
        type: String,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);

