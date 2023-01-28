const {
  NODE_ENV, JWT_SECRET, MONGODB_URL, PORT,
} = process.env;

const jwtSecret = NODE_ENV === 'production'
  ? JWT_SECRET : 'dev-secret';
if (!jwtSecret) {
  throw new Error('Production process.env.JWT_SECRET is not defined');
}
module.exports.jwtSecret = jwtSecret;

const mongoDbUrl = NODE_ENV === 'production'
  ? MONGODB_URL : 'mongodb://localhost:27017/bitfilmsdb';
if (!mongoDbUrl) {
  throw new Error('Production process.env.MONGODB_URL is not defined');
}
module.exports.mongoDbUrl = mongoDbUrl;

module.exports.port = PORT || 3010;

module.exports.MSG_SIGNOUT_SUCCESS = 'Произведён выход из системы';
module.exports.MSG_INCORRECT_CREDENTIALS = 'Переданы неверный email или пароль';
module.exports.MSG_NEED_AUTHORIZATION = 'Необходима авторизация';
module.exports.MSG_SERVER_GOES_DOWN = 'Сервер сейчас упадёт';
module.exports.MSG_ACCESS_DENIED = 'Отказано в доступе';
module.exports.MSG__NOT_FOUND = 'Ресурс не найден';
module.exports.MSG_INCORRECT_EMAIL = 'Некорректный email адрес';
module.exports.MSG_INCORRECT_LINK = 'Некорректная ссылка';
module.exports.MSG_DUPLICATED_EMAIL = 'Пользователь с таким email уже существует';
module.exports.MSG_BAD_REQUEST = 'Переданы некорректные данные';
module.exports.MSG_ERROR_OCCURRED = 'Произошла ошибка';
