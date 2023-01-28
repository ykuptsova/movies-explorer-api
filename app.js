require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handle-error');
const { login, createUser, logout } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoDbUrl, port } = require('./utils/constants');
const { validateLogin, validateCreateUser } = require('./utils/validations');
const { rateLimiter } = require('./utils/rate-limiter');
const { MSG_SERVER_GOES_DOWN } = require('./utils/constants');

// конфигурируем базу данных
mongoose.set('strictQuery', true);

// подключаемся к серверу mongo
mongoose.connect(mongoDbUrl, { useNewUrlParser: true });

// создаем сервер
const app = express();

// ограничиваем число запросов в минуту
app.use(rateLimiter);

// обрабатываем CORS заголовки
app.use(cors());

// настраиваем заголовки
app.use(helmet());

// разбираем body в json
app.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(MSG_SERVER_GOES_DOWN);
  }, 0);
});

// добавляем руты
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.post('/signout', logout);
app.use(['/users', '/movies', '/'], require('./routes/index'));

// подключаем логгер ошибок
app.use(errorLogger);

// обрабатываем ошибки централизованно
app.use(errors());
app.use(handleError);

// поднимаем сервер по порту
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
