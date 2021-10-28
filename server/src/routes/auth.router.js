const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Token } = require('../db/models');

const refSecret = 'secret ref token';
const accSecret = 'secret acc token';

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  //TODO: проверять если пассворд
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const accesToken = jwt.sign({ id: user.id }, accSecret);
      const refToken = jwt.sign({ id: user.id }, refSecret);
      const tokenData = await Token.findOne({ userId: user.id });
      if (tokenData) {
        tokenData.token = refToken;
        tokenData.save();
      } else {
        await Token.create({ token: refToken, userId: user.id });
      }
      res.json({ userEmail: user.email, accesToken });
    }
  } else {
    res.status(400).json('incorrect password or email');
  }
});
router.post('/api/registration', async (req, res) => {
  const { email, password: pass, login } = req.body;
  if (email && pass && login) {
    try {
      const user = await User.create({
        email,
        password: await bcrypt.hash(pass, 10),
        login,
      });
      const accesToken = jwt.sign({ id: user.id }, accSecret);
      const refToken = jwt.sign({ id: user.id }, refSecret);
      await Token.create({ token: refToken, userId: user.id });
      res.json({ userEmail: user.email, accesToken });
    } catch (error) {
      res.sendStatus(400);
    }
  }
});

module.exports = router;
