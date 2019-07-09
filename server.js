const express = require('express')
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const app = express()

//VIEWS
app.set('views', './src/views')
app.set('view engine', 'ejs')

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
const viewsRouter = require('./src/routers/ViewsRouter')
const apiRouter = require('./src/routers/ApiRouter')
app.use('/', viewsRouter)
app.use('/api', apiRouter)

//BOTS
const botBancoCentral = require('./src/bots/botBancoCentral')
schedule.scheduleJob('0 0 23 * * *', botBancoCentral)
botBancoCentral()

//LISTEN
app.listen(3030)