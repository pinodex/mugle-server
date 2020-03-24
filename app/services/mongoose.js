const mongoose = require('mongoose');

const {
  host, port, username, password, db,
} = require('@config/mongodb');

const url = username && password
  ? `mongodb://${username}:${password}@${host}:${port}/${db}`
  : `mongodb://${host}:${port}/${db}`;

exports.connect = () => mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.mongoose = mongoose;
