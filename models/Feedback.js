const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackSchema = new Schema({

    idUsuario: {
        type: String,
        required: true
    },
    assunto: {
        type: String,
    },
    descricao: {
        type: String,
    }
},
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema)

module.exports = {
    Feedback,
    feedbackSchema
}
