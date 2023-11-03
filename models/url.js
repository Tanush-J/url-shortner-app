const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    require: true,
    type: String,
  },
  redirectUrl: {
    require: true,
    type: String,
  },
  visitHistory: [{ timestamp: { type: Number } }],
});

const model = mongoose.model('Url', urlSchema);
module.exports = model;
