import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import db from './config/mongo'
import { router } from './routes'
import { errorEndPoint, responseError } from './utils/error.handle'

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('storage'))
app.use(router)

app.use('*', errorEndPoint)
app.use(responseError)

db().then(() => console.log(`> API REST on http://localhost:${PORT}`))

app.listen(PORT, () => {
    console.log(`> Started API REST...`)
})
