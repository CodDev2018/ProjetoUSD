async function buscarCotacaoAtual() {
    const result = await fetch('/api/cotacao/hoje')
    const cotacao = await result.json();
    cotacao.data = moment(cotacao.data).toDate()
    cotacao.manual = false;
    return cotacao
}