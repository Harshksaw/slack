import express from 'express'
import StatusCodes from 'http-status-codes'
const app = express()


import { PORT } from './config/serverConfig.js'
import { connectDB } from './config/dbConfig.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Hello, Slack Backend!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})