const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const refSecret = 'secret ref token';
const accSecret = 'secret acc token';

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const accesToken = jwt.sign({ id: user.id }, accSecret);
      const refToken = jwt.sign({ id: user.id }, refSecret);
      res.json({ userEmail: user.userEmail, accesToken });
    }
  } else {
    res.status(400).json('incorrect password or email');
  }
});

module.exports = router;
