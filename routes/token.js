const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const User = require('../models/User');

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken, userId } = req.body;

    // verify refresh token to the secret and expiry
    const jwtVerify = jwt.verify(refreshToken, 'anotherSecret');

    if (jwtVerify) {
      const existentRefreshToken = await Token.findOne({ userId, refreshToken });

      // if refresh token exists and has corresponding to user id
      if (existentRefreshToken) {
        const user = await User.findById(userId);

        // update access token and resfresh token
        const newToken = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '2m' });
        const newRefreshToken = jwt.sign({ userId: user.id }, 'anotherSecret', { expiresIn: '3m' });

        // drop old refresh token and create new
        await Token.findByIdAndDelete(existentRefreshToken.id);
        await Token.create({ userId: user.id, refreshToken: newRefreshToken });

        res.status(201).json({ token: newToken, refreshToken: newRefreshToken });
      } else {
        res.status(500).send({ err: 'token refreshing failed' });
      }
    } else {
      res.status(500).json({ err: 'refresh token is expired' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'internal server error' });
  }
});

module.exports = router;
