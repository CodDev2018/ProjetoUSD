const express = require('express')
const router = express.Router()

const Cotacao = require('../models/CotacaoSchema')

router.get('/cotacao/hoje', (req, res) => {
    Cotacao.findOne().sort('-data').exec((err, cotacao) => {
        if (err) {
            return res.status(500).json({
                msg: "Não foi possível recuperar a cotação"
            })
        }
        return res.status(200).json({
            id: cotacao._id,
            compra: cotacao.compra,
            venda: cotacao.venda,
            data: cotacao.data
        })
    })
})

module.exports = router