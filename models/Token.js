const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  refreshToken: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model('Token', tokenSchema);
