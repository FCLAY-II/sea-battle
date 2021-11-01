const router = require('express').Router();
const { User } = require('../db/models');

router.get('/users', async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

module.exports = router;
