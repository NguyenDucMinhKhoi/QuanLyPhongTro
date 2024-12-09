import express from 'express'
require('dotenv').config()
import cors from 'cors'
import initRoutes from './src/routes'

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["PORT", "GET", "PUT", "DELETE"]
}))
app.use(express.json())
app.use(express.urlencoded({entended: true}))

initRoutes(app)

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`)
})