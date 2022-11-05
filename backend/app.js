const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRoutes')

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal server error, check console')
})

app.use('/user', userRouter);
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
