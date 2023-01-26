require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handle-error');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateCreateUser } = require('./utils/validations');

// разбираем настройки окружения
const { PORT = 3010, NODE_ENV } = process.env;
if (NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'dev-secret';
}

// конфигурируем базу данных
mongoose.set('strictQuery', true);

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

// создаем сервер
const app = express();

// обрабатываем CORS заголовки
app.use(cors());

// разбираем body в json
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// добавляем руты
app.post(
  '/signin',
  validateLogin,
  login,
);
app.post(
  '/signup',
  validateCreateUser,
  createUser,
);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));
app.use('/', require('./routes/not-found'));

// подключаем логгер ошибок
app.use(errorLogger);

// обрабатываем ошибки централизованно
app.use(errors());
app.use(handleError);

// поднимаем сервер по порту
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
