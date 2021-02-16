
const redis = require("redis");

redisClient = redis.createClient(process.env.REDIS_URI);

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }
  return redisClient.get(authorization, (err, callback) => {
    if (err || !callback) {
      return res.status(401).send("Unauthorized");
    }
    return next();
  });
};

const validateToken = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }
  return redisClient.get(authorization, (err, callback) => {
    if (err || !callback) {
      return res.status(401).send("Unauthorized");
    }
    return res.json(JSON.parse(callback));
  });
};

module.exports = {
  requireAuth: requireAuth,
  validateToken : validateToken
};
