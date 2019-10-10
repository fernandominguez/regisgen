let lang = require("../services/lang");
let token = require("../services/token");
let user = require("../../models/users");

module.exports = app => {
  // Return Login Data
  app.get("/api/auth/:credentials", (req, res) => {
    var username = req.query ? req.query.username : undefined;
    var password = req.query ? req.query.password : undefined;
    var role = req.query ? req.query.role : undefined;

    if (!username || !password) {
      return res
        .status(403)
        .send({ message: lang.message("Error Auth 010", req, res) });
    } else {
      user
        .findByUsername(username)
        .then(rows => {
          if (!rows || rows.length < 1) {
            return res
              .status(403)
              .send({ message: lang.message("Error Api/Auth 002", req, res) });
          } else {
            if (password !== rows[0].password) {
              return res.status(403).send({
                message: lang.message("Error Api/Auth 002", req, res)
              });
            } else {
              var tokenData = JSON.parse(JSON.stringify(rows[0]));
              tokenData.roleId = role ? role : undefined;
              return res
                .status(200)
                .json({ token: token.createToken(tokenData) });
            }
          }
        })
        .catch(err => {
          return res.status(500).send({ message: err.message });
        });
    }
  });
};
