let config = require("../config");
let lang = require("../services/lang");
let axios = require("axios");
let jwt = require("jwt-simple");
let passport = require("passport");

let authenticationMiddleware = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  };
};

module.exports = authenticationMiddleware;

passport.serializeUser((token, done) => {
  let payload = jwt.decode(token, config.SECRET_KEY);
  let user = payload.sub;
  done(null, {
    id: user.id ? user.id : undefined,
    role: user.role ? user.role : undefined,
    locale: user.locale ? user.locale : undefined,
    token: token
  });
});

passport.deserializeUser((user, done) => {
  console.log(user);
  if (!user.role) {
    axios
      .get(config.API_HOST + "/api/user/:id", {
        headers: { authorization: user.token },
        params: { id: user.id }
      })
      .then(data => {
        if (data && data.data) {
          axios.get(config.API_HOST + "/api/user-roles/:id", {
            headers: {
              authorization: user.token
            },
            params: {
              id: user.id
            }
          })
          .then(roles => {
            if (!roles || !roles.data || roles.data.length < 1) {
              done(new Error("Error deserializing user."), null);
            } else {
              data.data.roleId = roles.data[0].id;
              data.data.roleName = roles.data[0].name;
              done(null, data.data);
            }
          })
          .catch(err => {
            done(err, null);
          })
        } else {
          done(new Error("Error deserializing user."), null);
        }
      })
      .catch(err => {
        done(err, null);
      });
  } else {
    axios
      .get(config.API_HOST + "/api/user/:id/:role", {
        headers: { authorization: user.token },
        params: { id: user.id, role: user.role, locale: lang.getLocale(user.locale) }
      })
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          done(null, data.data[0]);
        } else {
          done(new Error("Error deserializing user."), null);
        }
      })
      .catch(err => {
        axios
          .get(config.API_HOST + "/api/user/:id", {
            headers: { authorization: user.token },
            params: { id: user.id }
          })
          .then(data => {
            if (data && data.data && data.data.length > 0) {
              done(null, data.data);
            }
            done(new Error("Error deserializing user."), null);
          })
          .catch(err => {
            done(err, null);
          });
      });
  }
});

passport.authenticationMiddleware = authenticationMiddleware;
