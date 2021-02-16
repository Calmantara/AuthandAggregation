const bcrypt = require("bcrypt-nodejs");

const generatepasswordHandle = (req, res, db) => {
  const { name, phone, role } = req.body;
  //check in DB is the request is exist
  if (!name || !phone || !role) {
    return res
      .status(400)
      .json({ status: 1, message: "Incorrect Form Submission" });
  }
  return db
    .select("name", "phone", "role", "password", "joined")
    .from("users")
    .where("phone", "=", phone, "and", "name", "=", name)
    .then(data => {
      let isExist = data.length;
      if (isExist > 0) {
        res.status(200).json({ status: 2, message:"Already Registered" });
        return console.log("Already Registered");
      } else {
        const hash = bcrypt.hashSync({
          name: name,
          phone: phone,
          role: role
        });

        db.transaction(trx => {
          trx
            .insert({
              name: name,
              role: role,
              password: hash.slice(10, 14),
              phone: phone,
              joined: new Date()
            })
            .into("users")
            .returning("*")
            .then(trx.commit)
            .catch(trx.rollback);
        }).catch(err => res.status(400).json("unable to register"));

        res.status(200).json({ password: hash.slice(10, 14), status: 1 });
        return console.log("Success Add User");
      }
    })
    .catch(err => err);
};

module.exports = {
  generatepasswordHandle: generatepasswordHandle
};
