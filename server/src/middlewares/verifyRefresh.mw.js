const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(res.locals.token, process.env.TOKEN_SECRET);
    console.log('refresh payload:', payload);
    res.locals.userId = +payload.id;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
