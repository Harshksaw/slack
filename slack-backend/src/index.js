import express from 'express'
import StatusCodes from 'http-status-codes'
const app = express()


import { PORT } from './config/serverConfig.js'


app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Hello, Slack Backend!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})