const { Feedback: FeedbackModel, Feedback } = require("../models/Feedback");

const feedbackController = {

    create: async (req, res) => {
        try {
            const feedback = {
                idUsuario: req.body.idUsuario,
                assunto: req.body.assunto,
                descricao: req.body.descricao
            };
            const response = await FeedbackModel.create(feedback);

            res.status(201).json({ response, msg: "Feedback registrado com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const feedbacks = await FeedbackModel.find()

            res.json(feedbacks);
        } catch (error) {
            console.log(error)
        }
    },
    get: async (req, res) => {
        try {
            //id => URL == GET
            const id = req.params.id
            const feedback = await FeedbackModel.findById(id);

            if (!feedback) {
                res.status(404).json({ msg: "Feedback não encontrado!" });
                return;
            }

            res.json(feedback);

        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const feedback = await FeedbackModel.findById(id);

            if (!feedback) {
                res.status(404).json({ msg: "Feedback não encontrado!" });
                return;
            }

            const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);

            res
                .status(200)
                .json({ deletedFeedback, msg: "Feedback excluído com sucesso!" });

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        const id = req.params.id

        const feedback = {
            idUsuario: req.body.idUsuario,
            assunto: req.body.assunto,
            descricao: req.body.descricao
        };

        const updatedFeedback = await FeedbackModel.findByIdAndUpdate(id, feedback)

        if (!updatedFeedback) {
            res.status(404).json({ msg: "Feedback não encontrado!" });
            return;
        }

        res.status(200).json({ feedback, msg: "Feedback atualizado com sucesso!" });

    },
};


module.exports = feedbackController;
