const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const express = require('express');
const logger = require('morgan');

const routes = require(path.join(process.env.PWD, 'src', 'routes'));
const mwares = require(path.join(process.env.PWD, 'src', 'middlewares'));

const app = express();

app.use(logger('dev'));

app.use(express.json()); // <- 'application/json'
app.use(express.urlencoded({ extended: true })); // <- 'application/x-www-form-urlencoded'
app.use(cookieParser());
app.use(cors());

app.use('/api/', routes.main);
app.use('/api/auth', routes.auth);
app.use('/api/tokens', mwares.getToken, mwares.verifyRefresh, routes.tokens);
app.use('/api/games', mwares.getToken, mwares.verifyAccess, routes.games);
app.use('/api/invite', mwares.getToken, mwares.verifyAccess, routes.invite);
app.use('/api/profile/', mwares.getToken, mwares.verifyAccess, routes.profile);

module.exports = { app };
