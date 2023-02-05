require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handle-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoDbUrl, port } = require('./utils/constants');
const { rateLimiter } = require('./utils/rate-limiter');

// конфигурируем базу данных
mongoose.set('strictQuery', true);

// подключаемся к серверу mongo
mongoose.connect(mongoDbUrl, { useNewUrlParser: true });

// создаем сервер
const app = express();

// подключаем логгер запросов
app.use(requestLogger);

// ограничиваем число запросов в минуту
app.use(rateLimiter);

// обрабатываем CORS заголовки
app.use(cors());

// настраиваем заголовки
app.use(helmet());

// разбираем body в json
app.use(express.json());

// добавляем руты
app.use(require('./routes/index'));

// подключаем логгер ошибок
app.use(errorLogger);

// обрабатываем ошибки централизованно
app.use(errors());
app.use(handleError);

// поднимаем сервер по порту
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
