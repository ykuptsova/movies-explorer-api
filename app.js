require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handle-error');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateLogin, validateCreateUser } = require('./utils/validations');
const { rateLimiter } = require('./utils/rate-limiter');

// разбираем настройки окружения
const { PORT = 3010, NODE_ENV, MONGODB_URL } = process.env;
if (NODE_ENV !== 'production') {
  process.env.JWT_SECRET = 'dev-secret';
  process.env.MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb';
}

// конфигурируем базу данных
mongoose.set('strictQuery', true);

// подключаемся к серверу mongo
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

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
app.use(['/users', '/movies', '/'], require('./routes/index'));

// подключаем логгер ошибок
app.use(errorLogger);

// обрабатываем ошибки централизованно
app.use(errors());
app.use(handleError);

// поднимаем сервер по порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
