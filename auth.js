const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Token = require('./models/Token');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    // check credentials
    if (!user) {
      res.status(404).json({ err: 'email or password is wrong' });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    // check credentials
    if (!verifyPassword) {
      res.status(404).json({ err: 'email or password is wrong' });
    }

    // generate token
    const token = await jwt.sign({ userId: user.id }, 'secret', { expiresIn: '2m' });

    // generate refresh token and save it in the db
    const refreshToken = await jwt.sign({ userId: user.id }, 'anotherSecret', { expiresIn: '3m' });
    await Token.create({ userId: user.id, refreshToken });

    res.json({ token, refreshToken });
  } catch (er) {
    console.log(er);
    res.status(500);
  }
});

router.post('/register', async (req, res) => {
  try {
    // get email and password values from request body
    const { email, password } = req.body;

    const validationSucceded = email && password;

    if (!validationSucceded) {
      res.status(400).json({ err: 'email and password required' });
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    // save user
    const user = await User.create({ email, password: encryptedPassword });

    res.json({ id: user.id, email: user.email });
  } catch (er) {
    console.log(er);
    res.status(500);
  }
});

module.exports = router;
