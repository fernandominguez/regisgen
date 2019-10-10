let api = require("../services/api");
let passport = require("passport");

module.exports = app => {
  app.delete(
    "/thirdparty/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.delete("/api/thirdparty/:id", { id: req.params.id }, req, res);
    }
  );

  app.get("/thirdparties", passport.authenticationMiddleware(), (req, res) => {
    api.get("/api/thirdparties", null, req, res);
  });

  app.get(
    "/thirdparty/:id",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.get("/api/thirdparty/:id", { id: req.params.id }, req, res);
    }
  );

  app.post(
    "/thirdparty/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.post("/api/thirdparty", JSON.parse(req.params.data), req, res);
    }
  );

  app.put(
    "/thirdparty/:data",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.put("/api/thirdparty", JSON.parse(req.params.data), req, res);
    }
  );
};
