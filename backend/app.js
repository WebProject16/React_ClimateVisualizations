const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

const auth = require('./misc/auth');

const userRouter = require('./routes/userRoutes')
const testAuthRouter = require('./routes/testAuthRoutes')

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal server error, check console')
})

// endpoints that dont need authentication ->
app.use('/user', userRouter);

app.use(auth);
// endpoints that need authentication ->
app.use(testAuthRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
