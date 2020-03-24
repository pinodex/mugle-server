module.exports = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  username: process.env.MONGO_USER || null,
  password: process.env.MONGO_PASS || null,
  db: process.env.MONGO_DB,
};
