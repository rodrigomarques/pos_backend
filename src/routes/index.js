const express = require("express")
const router = express.Router()

const clientes = require("./clientes")
const localizacao = require("./localizacao")

router.use('/clientes', clientes)
router.use('/localizacao', localizacao)

module.exports = router