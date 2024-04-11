import express from 'express'
import config from "./config.js"
import db from "./db.js"
import cors from 'cors'
import router from "./routes/index.js"

const PORT = config.PORT || 6060
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use('/',express.static('public'))
app.use('/api', router)

async function start(){
    await db.authenticate()
    await db.sync()
    app.listen(PORT,  ()=> console.log(`сервер запущен на порту ${PORT}...`))
}

start()