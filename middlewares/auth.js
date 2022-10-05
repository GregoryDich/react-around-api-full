const jwt = require('jsonwebtoken');
const AppError = require('../errors/app-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AppError(401, 'Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    if (!payload) {
      throw new AppError(401, 'Authorization Required');
    }
  } catch (err) {
    next(err);
  }
  req.user = payload;

  next();
};
