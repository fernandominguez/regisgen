let config = require("../config");
let jwt = require("jwt-simple");
let moment = require("moment");

exports.createToken = user => {
  var payload = {
    sub: {
      id: user.id,
      role: user.roleId ? user.roleId : undefined,
      locale: user.locale ? user.locale : undefined
    },
    iat: moment().unix(),
    exp: moment()
      .add(config.TOKEN_EXPIRE_TIME, config.TOKEN_EXPIRE_UNITS)
      .unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};
