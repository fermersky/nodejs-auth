const app = require('express')();
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const cors = require('cors');

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

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/privacy', privacy);
app.use('/token', token);

const PORT = 80;
app.listen(PORT, () => `server started at ${PORT} port`);
