const jwt = require('jsonwebtoken');

async function jwtVerify(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401).json({ err: 'authorization failed' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({ err: 'authorization failed' });
    }

    const tokenVerify = jwt.verify(token, 'secret');
    if (!tokenVerify) {
      res.status(401).json({ err: 'authorization failed' });
    }

    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = jwtVerify;
