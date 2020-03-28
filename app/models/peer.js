const { Schema, model } = require('mongoose');
const hidden = require('mongoose-hidden')();

const PEER_LIFETIME_SECONDS = 60;

const definition = {
  lastRefresh: Date,

  isOccupied: {
    type: Boolean,
    default: () => false,
  },
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

schema.loadClass(Peer);
schema.plugin(hidden);

module.exports = model('Peer', schema);
