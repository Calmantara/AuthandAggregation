const redisClient = require("./signin").redisClient;

const requireAuth = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send("Unauthorized");
  }
  return redisClient.get(authorization, (err, callback) => {
    if (err || !callback) {
      return res.status(401).send("Unauthorized");
    }
    return res.json(JSON.parse(callback));
  });
};

module.exports = {
  requireAuth: requireAuth
};
