const express = require("express")
const router = express.Router();
const controller = require("./../controllers/LocalizaoController")

router.post("/", controller.enviarLocalizacao);
router.get("/:lat/:lon", controller.buscar);


module.exports = router;
