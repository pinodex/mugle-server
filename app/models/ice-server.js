const { Schema, model } = require('mongoose');
const hidden = require('mongoose-hidden')();

const definition = {
  url: {
    type: String,
    default: () => null,
  },

  urls: {
    type: [String],
    default: () => null,
  },

  maxRateKbps: {
    type: Number,
    default: () => null,
    index: true,
  },

  username: {
    type: String,
    default: () => null,
  },

  credential: {
    type: String,
    default: () => null,
  },
};

const schema = new Schema(definition);

schema.plugin(hidden);

module.exports = model('IceServer', schema);
