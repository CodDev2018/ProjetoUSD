const mongoose = require('mongoose')

const cotacaoSchema = new mongoose.Schema({
    compra: {type: Number, required: true},
    venda: {type: Number, required: true},
    data: {type: Date, required: true}
})

exports = module.exports = mongoose.model('Cotacao', cotacaoSchema, 'cotacao')