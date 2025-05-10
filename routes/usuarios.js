const router = require("express").Router()

const usuarioController = require("../controllers/usuarioController");

const upload = require("../multer/multer");

const { checkToken } = require("../checkToken/checkToken");

// Funções

router.post("/usuarios", upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'capa', maxCount: 1 }]), usuarioController.create);

router.route("/usuarios").get(checkToken, (req, res) => usuarioController.getAll(req, res));

router.route("/usuarios/:id").get(checkToken, (req, res) => usuarioController.get(req, res));

router.route("/usuarios/:id").delete(checkToken, (req, res) => usuarioController.delete(req, res));

router.put("/usuarios/:id", checkToken, upload.fields([{ name: 'foto', maxCount: 1 }, { name: 'capa', maxCount: 1 }]), usuarioController.update);

router.put("/usuarios/senha/:id", checkToken, (req, res) => usuarioController.updateSenha(req, res));

router.put("/usuarios/preferencias/:id", checkToken, (req, res) => usuarioController.updatePreferences(req, res));

module.exports = router;



