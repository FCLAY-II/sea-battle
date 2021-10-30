module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    res.locals.token = token;
    next();
  } else {
    res.sendStatus(400);
  }
};
