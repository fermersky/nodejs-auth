const router = require('express').Router();
const jwtVerify = require('../jwtVerify');

router.get('/', jwtVerify, (req, res) => {
  res.send('i am private');
});

module.exports = router;
