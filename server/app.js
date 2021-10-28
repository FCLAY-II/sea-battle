const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const express = require('express');
const logger = require('morgan');

const routes = require(path.join(process.env.PWD, 'src', 'routes'));

const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

//TODO: нужны ли сессии?
const sessionConfig = {
  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient }), // хранилище сессий
  key: 'sid', // ключ куки (название куки)
  secret: 'mysecret', // для шифрования id сессии
  resave: false, // сессия будет сохраняться заново только при изменениях
  saveUninitialized: false, // сохранение (или не сохранение) не инициализированной сессии
  // невозможно изменить куку с фронта
  cookie: {
    expires: 24 * 60 * 60e3,
    httpOnly: true,
    // secure: true,
    // sameSite: 'none',
  },
};

const PORT = 3001;

const app = express();

app.use(logger('dev'));

app.use(express.json()); // <- 'application/json'
app.use(express.urlencoded({ extended: true })); // <- 'application/x-www-form-urlencoded'
app.use(cookieParser());
app.use(cors());

app.use('/', routes.main);
app.use('/auth', routes.auth);

app.listen(PORT, () => {
  console.log('Dobro on port:', PORT);
});
