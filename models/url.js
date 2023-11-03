const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  id: {
    require: true,
    type: String,
  },
  redirectUrl: {
    require: true,
    type: String,
  },
  analytics: [{ timestamp: { type: Number } }],
});

const model = mongoose.model('Url', urlSchema);
module.exports = model;
