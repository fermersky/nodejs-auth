const app = require('express')();
const bodyParser = require('body-parser');
const { connect } = require('mongoose');

require('dotenv/config');

const auth = require('./auth');
const privacy = require('./privacy');
const token = require('./token');

connect(
  process.env.DB_CONNECTION,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err || 'connected to ');
  }
);

app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/privacy', privacy);
app.use('/token', token);

const PORT = 80;
app.listen(PORT, () => `server started at ${PORT} port`);
