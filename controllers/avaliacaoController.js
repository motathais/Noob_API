const { Avaliacao: AvaliacaoModel, Avaliacao } = require("../models/Avaliacao");

const avaliacaoController = {

    create: async (req, res) => {
        try {
            const { usuario, jogo, beleza, divertimento, duracao, preco, armazenamento } = req.body;

            const avaliacao = {
                usuario,
                jogo,
                beleza,
                divertimento,
                duracao,
                preco,
                armazenamento,
                nota: (beleza + divertimento + duracao + preco + armazenamento) / 5
            };

            const response = await AvaliacaoModel.create(avaliacao);

            res.status(201).json({ response, msg: "Avaliação registrada com sucesso!" });

        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const avaliacoes = await AvaliacaoModel.find().select('-usuario');
            res.json(avaliacoes);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar avaliações." });
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id;
            const avaliacao = await AvaliacaoModel.findById(id).select('-usuario');

            if (!avaliacao) {
                res.status(404).json({ msg: "Avaliação não encontrada!" });
                return;
            }

            res.json(avaliacao);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro ao buscar avaliação." });
        }

    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;

            const avaliacao = await AvaliacaoModel.findById(id);

            if (!avaliacao) {
                res.status(404).json({ msg: "Avaliação não encontrada!" });
                return;
            }

            const deletedAvaliacao = await AvaliacaoModel.findByIdAndDelete(id);

            res
                .status(200)
                .json({ deletedAvaliacao, msg: "Avaliação excluida com sucesso!" });

        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            const { usuario, jogo, beleza, divertimento, duracao, preco, armazenamento } = req.body;

            const avaliacao = {
                usuario,
                jogo,
                beleza,
                divertimento,
                duracao,
                preco,
                armazenamento,
                nota: (beleza + divertimento + duracao + preco + armazenamento) / 5
            };

            const updatedAvaliacao = await AvaliacaoModel.findByIdAndUpdate(id, avaliacao, { new: true });

            if (!updatedAvaliacao) {
                res.status(404).json({ msg: "Avaliação não encontrada!" });
                return;
            }

            res.status(200).json({ updatedAvaliacao, msg: "Avaliação atualizada com sucesso!" });

        } catch (error) {
            res.status(500).json({ msg: "Erro ao atualizar avaliação!" });
        }
    },
}

module.exports = avaliacaoController;