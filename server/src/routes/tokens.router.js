require('dotenv').config();

const jwt = require('jsonwebtoken');

const router = require('express').Router();
const { Token } = require('../db/models');

function getFreshTokens(payload, tokenSecret) {
  return {
    accessToken: jwt.sign(payload, tokenSecret, { expiresIn: '15m' }),
    refreshToken: jwt.sign(payload, tokenSecret, { expiresIn: '15d' }),
  };
}

const secret = process.env.TOKEN_SECRET;

router.get('/refresh', async (req, res) => {
  let accessToken;
  let refreshToken = res.locals.token;
  if (refreshToken) {
    try {
      // const payload = jwt.verify(refreshToken, secret);
      const record = await Token.findOne({ where: { userId: res.locals.userId } });
      console.log('rtoken from front:', refreshToken);
      console.log('rtoken from refresh:', record.token);
      if (record.token === refreshToken) {
        const tokens = getFreshTokens({ id: res.locals.userId }, secret);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;

        record.token = refreshToken;
        await record.save();
        console.log('rtoken to front:', refreshToken);
        console.log('rtoken to refresh:', record.token);
        res.json({ accessToken, refreshToken });
      } else {
        console.log('different tokens');
        await Token.destroy({ where: { id: record.id } });
        res.sendStatus(401);
      }
    } catch (err) {
      console.log('verify failed');
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
