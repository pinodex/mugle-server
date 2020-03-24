const { Schema, model } = require('mongoose');

const schema = new Schema({
  lastRefresh: Date,
}, {
  timestamps: true,
});

module.exports = model('Peer', schema);
