const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.ATOKEN_SECRET);
      res.locals.userId = payload.userId;
      next();
    } catch (err) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
};
