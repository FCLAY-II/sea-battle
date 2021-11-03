require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, Token } = require('../db/models');

const secret = process.env.TOKEN_SECRET;

function getFreshTokens(payload, tokenSecret) {
  return {
    accessToken: jwt.sign(payload, tokenSecret, { expiresIn: '5m' }),
    refreshToken: jwt.sign(payload, tokenSecret, { expiresIn: '15d' }),
  };
}

router.post('/signup', async (req, res) => {
  const { email, password: pass, login } = req.body;
  if (email && pass && login) {
    try {
      const user = await User.create({
        email,
        password: await bcrypt.hash(pass, 10),
        login,
      });

      const { accessToken, refreshToken } = getFreshTokens(
        { id: user.id },
        secret,
      );

      await Token.create({ token: refreshToken, userId: user.id });

      res.json({
        id: user.id,
        login: user.login,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'пользователь с такими данными уже есть' });
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
        [Op.or]: [{ login }, { email: login }],
      },
    });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { accessToken, refreshToken } = getFreshTokens(
          { id: user.id },
          secret,
        );

        const [record, created] = await Token.findOrCreate({
          where: { userId: user.id },
          defaults: { token: refreshToken },
        });
        if (!created) {
          record.token = refreshToken;
          console.log('sign in refresh token:', refreshToken);
          await record.save();
        }

        res.json({
          id: user.id,
          login: user.login,
          accessToken,
          refreshToken,
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

router.delete('/logout/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await Token.destroy({ where: { userId } });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
