const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(res.locals.token, process.env.ATOKEN_SECRET);
    res.locals.userId = +payload.userId;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};
