const express = require('express')
const app = express()
const port = 3030

let userRouter = require('./routes/userRoutes')

app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
