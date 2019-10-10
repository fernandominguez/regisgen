let config = require("../config");
let lang = require("../services/lang");
let jwt = require("jwt-simple");
let moment = require("moment");

exports.authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: lang.message("Error Auth 010", req, res) });
  }

  try {
    var token = req.headers.authorization.split(" ")[0];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    if (payload.exp <= moment().unix()) {
      return res
        .status(401)
        .send({ message: lang.message("Error Auth 020", req, res) });
    }
    req.user = payload.sub;
    next();
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
};
