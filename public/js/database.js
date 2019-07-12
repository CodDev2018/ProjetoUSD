let db = null
async function initDataBase() {
    try {
        db = new Dexie("cotacoes_db");
        db.version(1).stores({
            cotacoes: 'id,compra,venda,data,manual'
        });
        return db
    } catch (err) {
        console.error(err)
        return null
    }
}

async function saveCotacao(cotacao) {
    try {
        return await db.cotacoes.add(cotacao)
    } catch (err) {
        console.error(err)
    }
}

async function getLastCotacao() {
    try {
        return await db.cotacoes.orderBy('data').last()
    } catch (err) {
        console.error(err)
    }
}