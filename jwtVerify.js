const jwt = require('jsonwebtoken');

async function jwtVerify(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token && jwt.verify(token, 'secret')) {
      next();
    }

    res.status(401).end({ err: 'authorization failed' });
  } catch (err) {
    res.status(401).send({ err: 'authorization failed' });
  }
}

module.exports = jwtVerify;
