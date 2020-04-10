const mongoose = require('mongoose');

const {
  uri,
  host,
  port,
  username,
  password,
  db,
} = require('@config/mongodb');

let connectionUri = uri;

if (!connectionUri) {
  connectionUri = username && password
    ? `mongodb://${username}:${password}@${host}:${port}/${db}`
    : `mongodb://${host}:${port}/${db}`;
}

exports.connect = () => mongoose.connect(connectionUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

exports.mongoose = mongoose;
