const peerService = require('@services/peer');
const onPresenceHandler = require('@controllers/ws/events/on-presence');
const onReadyHandler = require('@controllers/ws/events/on-ready');
const onPeerDisconnect = require('@controllers/ws/events/on-peer-disconnect');

const messageEventMap = {
  presence: onPresenceHandler,
  ready: onReadyHandler,
  peerDisconnect: onPeerDisconnect,
};

/**
 * On Socket Connection
 *
 * @param  {Socket} socket
 */
exports.onConnection = async (socket) => {
  const id = await peerService.create(socket.id);

  await socket.publish('/ws/peer/id', id);
};

/**
 * On Socket Disconnection
 *
 * @param  {Socket} socket
 */
exports.onDisconnection = async (socket) => {
  const { id } = await peerService.getBySocketId(socket.id);

  await peerService.delete(id);
};

/**
 * On Socket Message
 *
 * @param  {Socket} socket
 */
exports.onMessage = (socket, { type, data }) => {
  if (!(type in messageEventMap)) {
    return;
  }

  messageEventMap[type](socket, data);
};
