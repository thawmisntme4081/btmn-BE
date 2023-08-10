import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connect from './database.js'
import partnerRouter from './routes/partners.js'
import typePartnerRouter from './routes/typePartners.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors({ origin: process.env.CLIENT_URL }))

app.use('/partners', partnerRouter)
app.use('/typePartners', typePartnerRouter)

connect(() => {
  console.log('Connected to DB')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
