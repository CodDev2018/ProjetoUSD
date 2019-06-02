const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const app = express()

//PUBLIC 
app.use(express.static('./public'))

//BODY PARSER
app.use(bodyParser.json())

//DB CONNECTION
const dbURL = 'mongodb://localhost/usd'
const mongoose = require('mongoose')
mongoose.connect(dbURL, {
    useNewUrlParser: true
})

//ROUTERS
const apiRouter = require('./src/routers/ApiRouter')
app.use('/api', apiRouter)

//BOTS
const botBancoCentral = require('./src/bots/botBancoCentral')
schedule.scheduleJob('0 0 23 * * *', botBancoCentral)

//LISTEN
app.listen(3030)