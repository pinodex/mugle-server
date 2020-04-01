const peerService = require('@services/peer');
const onPresenceHandler = require('@controllers/ws/events/on-presence');
const onReadyHandler = require('@controllers/ws/events/on-ready');

const messageEventMap = {
  presence: onPresenceHandler,
  ready: onReadyHandler,
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
  await peerService.deleteBySocketId(socket.id);
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
