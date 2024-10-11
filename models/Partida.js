const mongoose = require("mongoose");

const { Schema } = mongoose;

const partidaSchema = new Schema({
    usuarios: [{
        apelido: {
            type: String,
        }
    }],
    jogo: {
        type: String
    },
    vencedor: [{
        apelido: {
            type: String
        }
    }],
    duracao: {
        type: String
    }
}, { timestamps: true });

const Partida = mongoose.model("Partida", partidaSchema)

module.exports = {
    Partida,
    partidaSchema
}