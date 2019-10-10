let config = require("../config");
let axios = require("axios");
let i18n = require("i18n");
let passport = require("passport");

module.exports = app => {
  app.delete(
    "/config/permission/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .delete(config.API_HOST + "/api/permission/:id", {
          headers: {
            authorization: req._passport.session.user.token
          },
          params: {
            id: req.params.id,
            locale: locale
          }
        })
        .then(data => {
          res.json(data.data);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );

  app.get(
    "/config/permission/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .get(config.API_HOST + "/api/permission/:id", {
          headers: {
            authorization: req._passport.session.user.token
          },
          params: {
            id: req.params.id,
            locale: locale
          }
        })
        .then(data => {
          res.json(data.data);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );

  app.get(
    "/config/permissions",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .get(config.API_HOST + "/api/permissions/", {
          headers: {
            authorization: req._passport.session.user.token
          },
          params: {
            locale: locale
          }
        })
        .then(data => {
          res.json(data.data);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );

  app.post(
    "/config/permission/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .post(
          config.API_HOST + "/api/permission",
          {
            data: {
              data: req.params.data,
              locale: locale
            }
          },
          {
            headers: {
              authorization: req._passport.session.user.token
            }
          }
        )
        .then(data => {
          res.json(data.data);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );

  app.put(
    "/config/permission/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .put(
          config.API_HOST + "/api/permission",
          {
            data: {
              data: req.params.data,
              locale: locale
            }
          },
          {
            headers: {
              authorization: req._passport.session.user.token
            }
          }
        )
        .then(data => {
          res.json(data.data);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );
};
