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

      const accessToken = jwt.sign({ id: user.id, expiresIn: '5s' }, accSecret);
      const refreshToken = jwt.sign({ id: user.id, expiresIn: '10s' }, refSecret);

      await Token.create({ token: refreshToken, userId: user.id });

      res.json({
        id: user.id, login: user.login, accessToken, refreshToken,
      });
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

        res.json({
          id: user.id, login: user.login, accessToken, refreshToken,
        });
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

module.exports = router;
