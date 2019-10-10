let config = require("../config");
let axios = require("axios");
let i18n = require("i18n");
let passport = require("passport");

module.exports = app => {
  app.delete(
    "/config/menu/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .delete(config.API_HOST + "/api/menu/:id", {
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
    "/config/menu/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .get(config.API_HOST + "/api/menu/:id", {
          headers: {
            authorization: req._passport.session.user.token
          },
          params: {
            id: req.params.id,
            locale: locale
          }
        })
        .then(data => {
          res.json(data.data[0]);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );

  app.get("/config/menus", passport.authenticationMiddleware(), (req, res) => {
    var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
    axios
      .get(config.API_HOST + "/api/menus/", {
        headers: {
          authorization: req._passport.session.user.token
        },
        params: {
          role: req.params.role,
          locale: locale
        }
      })
      .then(data => {
        res.json(data.data);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

  app.get(
    "/config/menus/others/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .get(config.API_HOST + "/api/menus/others/:id", {
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
    "/menu-crude/:menu/:role",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .get(config.API_HOST + "/api/menu-crude/:menu/:role", {
          headers: {
            authorization: req._passport.session.user.token
          },
          params: {
            menu: req.params.menu,
            role: req.params.role,
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

  app.get("/tree/:role", passport.authenticationMiddleware(), (req, res) => {
    var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
    axios
      .get(config.API_HOST + "/api/tree", {
        headers: {
          authorization: req._passport.session.user.token
        },
        params: {
          role: req.params.role,
          locale: locale
        }
      })
      .then(data => {
        res.json(data.data);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });

  app.post(
    "/config/menu/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .post(
          config.API_HOST + "/api/menu",
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
    "/config/menu/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
      axios
        .put(
          config.API_HOST + "/api/menu",
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
          res.json(data);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  );
};
