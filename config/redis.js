module.exports = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD || null,
  db: process.env.REDIS_DB || 0,
  tls: process.env.REDIS_TLS || false,
};
