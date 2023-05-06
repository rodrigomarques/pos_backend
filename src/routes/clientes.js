const express = require("express")
const router = express.Router();
const controller = require("./../controllers/ClienteController")

router.post("/", controller.cadastrar);
router.get("/:cpf", controller.buscar);


module.exports = router;
