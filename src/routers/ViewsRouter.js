const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.render('index')
})

router.get('/sobre', (req, res) => {
    return res.render('sobre')
})

router.get('/config', (req, res) => {
    return res.render('config')
})

module.exports = router