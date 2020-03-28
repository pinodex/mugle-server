class PeerNotFound extends Error {
  constructor() {
    super('Peer not found.');
  }
}

class PeerExpired extends Error {
  constructor() {
    super('Peer expired.');
  }
}

module.exports = {
  PeerNotFound,
  PeerExpired,
};
