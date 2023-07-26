import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import partnerRouter from './routes/partners.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(methodOverride('_method'))

app.use('/partners', partnerRouter)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
