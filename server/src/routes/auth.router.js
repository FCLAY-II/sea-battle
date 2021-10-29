require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Token } = require('../db/models');

const refSecret = process.env.RTOKEN_SECRET;
const accSecret = process.env.ATOKEN_SECRET;

// const authErrors = {
//   BAD_PASSWORD: 'Введён неправильный пароль',
//   // BAD_PASSWORD: 'Введён неправильный пароль',
// };

router.post('/signup', async (req, res) => {
  const { email, password: pass, login } = req.body;
  if (email && pass && login) {
    try {
      const user = await User.create({
        email,
        password: await bcrypt.hash(pass, 10),
        login,
      });

      const accessToken = jwt.sign({ id: user.id, expiresIn: '30s' }, accSecret);
      const refreshToken = jwt.sign({ id: user.id, expiresIn: '60s' }, refSecret);

      await Token.create({ token: refreshToken, userId: user.id });

      res.json({ login: user.login, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: 'пользователь с такими данными уже есть' });
    }
  } else {
    res.status(400).json({ message: 'недостаточно данных' });
  }
});

router.post('/signin', async (req, res) => {
  const { login, password } = req.body;

  if (login && password) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { login },
          { email: login },
        ],
      },
    });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({ id: user.id, expiresIn: '30s' }, accSecret);
        const refreshToken = jwt.sign({ id: user.id, expiresIn: '60s' }, refSecret);

        await Token.update({ token: refreshToken }, { where: { userId: user.id } });

        res.json({ login: user.login, accessToken, refreshToken });
      } else {
        res.status(400).json({ message: 'incorrect password' });
      }
    } else {
      res.status(400).json({ message: 'incorrect login or email' });
    }
  } else {
    res.status(400).json({ message: 'недостаточно данных' });
  }
});

router.post('/tokens/refresh', async (req, res) => {
  let { refreshToken } = req.body;
  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, refSecret);
      const record = await Token.findOne({ where: { userId: payload.userId } });
      if (record.token === refreshToken) {
        const accessToken = jwt.sign({ id: payload.userId, expiresIn: '30s' }, accSecret);
        refreshToken = jwt.sign({ id: payload.userId, expiresIn: '60s' }, refSecret);
        record.token = refreshToken;
        record.save();
        res.json({ accessToken, refreshToken });
      } else {
        await Token.destroy({ where: { id: record.id } });
        res.sendStatus(401);
      }
    } catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
