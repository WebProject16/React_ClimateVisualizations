const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT


let userRouter = require('./routes/userRoutes')

app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
