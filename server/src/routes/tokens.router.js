require('dotenv').config();

const jwt = require('jsonwebtoken');

const router = require('express').Router();
const { Token } = require('../db/models');

const refSecret = process.env.RTOKEN_SECRET;
const accSecret = process.env.ATOKEN_SECRET;

router.get('/refresh', async (req, res) => {
  let refreshToken = res.locals.token;
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
