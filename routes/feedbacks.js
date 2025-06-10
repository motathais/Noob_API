const router = require("express").Router()

const feedbackController = require("../controllers/feedbackController");

const { checkToken } = require("../checkToken/checkToken");

// Funções

router.route("/feedbacks").post(checkToken, (req, res) => feedbackController.create(req, res));

router.route("/feedbacks").get(checkToken, (req, res) => feedbackController.getAll(req, res));

router.route("/feedbacks/:id").get(checkToken, (req, res) => feedbackController.get(req, res));

router.route("/feedbacks/:id").delete(checkToken, (req, res) => feedbackController.delete(req, res));

router.route("/feedbacks/:id").put(checkToken, (req, res) => feedbackController.update(req, res));


module.exports = router;