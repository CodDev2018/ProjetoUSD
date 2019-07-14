async function config() {
    recuperarCotacao()

    const formConfig = document.forms['config']
    formConfig.addEventListener('submit', salvar)
    formConfig.addEventListener('reset', excluir)

    function recuperarCotacao() {
        if (localStorage.cotacao) {
            const cotacao = JSON.parse(localStorage.cotacao)
            if (cotacao.offline) {
                document.querySelector('#inputCompra').value = (parseFloat(cotacao.compra).toPrecision(4) * 10000).toString()
                document.querySelector('#inputVenda').value = (parseFloat(cotacao.venda).toPrecision(4) * 10000).toString()
            }
        }

        $('#inputCompra').mask('#.##0,0000', {
            reverse: true
        }).change();

        $('#inputVenda').mask('#.##0,0000', {
            reverse: true
        }).change();
    }

    function salvar(event) {
        event.preventDefault()
        let compra = document.querySelector('#inputCompra').value
        compra = compra ? parseFloat(compra.replace('.', '').replace(',', '')) / 10000.0 : 0.0

        let venda = document.querySelector('#inputVenda').value
        venda = venda ? parseFloat(venda.replace('.', '').replace(',', '')) / 10000.0 : 0.0

        localStorage.cotacao = JSON.stringify({
            compra: compra,
            venda: venda,
            data: moment().format(),
            offline: true
        })

        alert('Configurações salvas com sucesso!')
    }

    function excluir(event) {
        event.preventDefault()
        if (confirm("Confirmar a exclusão das configurações?")) {
            delete localStorage.cotacao
            window.location.reload()
        }
    }
}