const { MongoMemoryServer } = require('mongodb-memory-server');
const { connect } = require('@services/mongoose');

let server = null;
let mongoose = null;

exports.connect = async () => {
  server = new MongoMemoryServer();

  const uri = await server.getUri();

  mongoose = await connect(uri);

  return { server, mongoose };
};

exports.disconnect = async () => {
  await mongoose.disconnect();

  await server.stop();
};

exports.server = server;

exports.mongoose = mongoose;
