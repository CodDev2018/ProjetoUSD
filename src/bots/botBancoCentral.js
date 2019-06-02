const axios = require('axios')
const moment = require('moment')

const Cotacao = require('../models/CotacaoSchema')

async function botBancoCentral() { 
    let data = moment().format('MM-DD-YYYY')
    console.log('Buscando dados no banco central em '+data+'.')
    const endpoint = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json`
    try {
        const response = await axios.get(endpoint)
        const cotacaoBC = response.data.value[0]
        if (!cotacaoBC) {
            return null
        }
        let cotacao = new Cotacao({
            compra: cotacaoBC.cotacaoCompra,
            venda: cotacaoBC.cotacaoVenda,
            data: cotacaoBC.dataHoraCotacao
        })
        console.log('Cotação atualizada: Venda = '+cotacao.venda+' e Compra = '+cotacao.compra+'.')
        cotacao = await cotacao.save()
        return cotacao
    } catch (error) {
        console.error(error)
        return null
    }
}

module.exports = botBancoCentral