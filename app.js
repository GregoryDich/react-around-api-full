const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const centralErrorHandler = require('./middlewares/central-error-handler');

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use(helmet());
app.use(errors());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use(router);
app.all('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  centralErrorHandler(err, res);
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
