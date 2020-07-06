const express = require('express');
const helmet = require('helmet');
const { connect } = require('mongoose');
const cors = require('cors');
const xss = require('xss-clean');

const app = express();

require('dotenv/config');

const auth = require('./routes/auth');
const privacy = require('./routes/privacy');
const token = require('./routes/token');
const jwtVerify = require('./jwtVerify');

connect(
  process.env.DB_CONNECTION,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err || 'connected to auth-testing-db');
  }
);

app.use(xss());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use('/auth', auth);
app.use('/token', token);

const PORT = 80;
app.listen(PORT, () => `server started at ${PORT} port`);
