class PeerNotFound extends Error {
  constructor() {
    super('Peer not found.');
  }
}

module.exports = {
  PeerNotFound,
};
