// Setup redis and JWT
const jwt = require("jsonwebtoken");
const redis = require("redis");

redisClient = redis.createClient(process.env.REDIS_URI);

const signinHandle = (req, res, db) => {
  const { phone, password } = req.body;
  //check in DB is the request is exist
  if (!phone || !password) {
    return res
      .status(400)
      .json({ status: 1, message: "Incorrect Form Submission" });
  }
  return db
    .select("name", "phone", "role", "password", "joined")
    .from("users")
    .where("phone", "=", phone)
    .then(data => {
      const isValid = data[0].password === password;
      if (isValid) {
        return data;
      } else {
        return res.status(400).json({ status: 1, message: "Wrong Credential" });
      }
    })
    .catch(err =>
      res.status(400).json({ status: 1, message: "User doesn't exist" })
    );
};

const signToken = phone => {
  const jwtPayload = { phone };
  return jwt.sign(jwtPayload, "JWT_SECRET_KEY", { expiresIn: "2 days" });
};

const setToken = (key, value) => {
  Promise.resolve(redisClient.set(key, value));
  return { status: "success" };
};

const createSession = user => {
  const tokenFromPhone = signToken(user[0].phone);
  setToken(tokenFromPhone, JSON.stringify(user[0]));

  return { user: user, token: tokenFromPhone };
};

const getAuthTokenID = (req, res) => {
  const { authorization } = req.headers;
  //call data from redis database
  return redisClient.get(authorization, (err, callback) => {
    if (err || !callback) {
      return res.status(401).send("Unauthorized");
    }
    const callbackData = JSON.parse(callback);
    res.json(callbackData);
    return { user: callbackData, token: authorization };
  });
};

const signInAuth = db => (req, res) => {
  const { authorization } = req.headers;
  //Check if the user already signin
  return authorization
    ? getAuthTokenID(req, res)
    : signinHandle(req, res, db)
        .then(data => {
          delete data[0].password;
          return data.length > 0 ? createSession(data) : Promise.reject(data);
        })
        .then(session => {
          res.json(session);
          return session;
        })
        .catch(err => res.status(400).json(err));
};

module.exports = {
  signInAuth: signInAuth,
  redisClient: redisClient
};
