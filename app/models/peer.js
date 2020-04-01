const { Schema, model } = require('mongoose');
const hidden = require('mongoose-hidden')();

const { PEER_LIFETIME_SECONDS } = require('@models/constants');

const definition = {
  socketId: {
    type: String,
    index: true,
  },

  isReady: {
    type: Boolean,
    default: () => false,
  },

  isOccupied: {
    type: Boolean,
    default: () => false,
  },

  lastRefresh: Date,
};

const options = {
  timestamps: true,
};

class Peer {
  /**
   * Peer expiry state
   *
   * @return {Boolean}
   */
  get isExpired() {
    const diffMs = new Date() - this.lastRefresh;

    return (diffMs / 1000) > PEER_LIFETIME_SECONDS;
  }
}

const schema = new Schema(definition, options);

schema.index({
  isReady: 1,
  isOccupied: 1,
  lastRefresh: 1,
});

schema.loadClass(Peer);
schema.plugin(hidden);

module.exports = model('Peer', schema);
