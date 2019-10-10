let api = require("../services/api");
let passport = require("passport");

module.exports = app => {
  app.delete("/note/:id", passport.authenticationMiddleware(), (req, res) => {
    api.delete("/api/registry/:id", { id: req.params.id }, req, res);
  });

  app.get("/note/:id", passport.authenticationMiddleware(), (req, res) => {
    api.get("/api/registry/:id", { id: req.params.id }, req, res);
  });

  app.post("/note/:data", passport.authenticationMiddleware(), (req, res) => {
    api.post("/api/registry", JSON.parse(req.params.data), req, res);
  });

  app.put("/note/:data", passport.authenticationMiddleware(), (req, res) => {
    api.put("/api/registry", JSON.parse(req.params.data), req, res);
  });

  app.get("/registry", passport.authenticationMiddleware(), (req, res) => {
    api.get("/api/registry/", null, req, res);
  });

  app.get(
    "/registry/scroll/:after/:count",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.get(
        "/api/registry/scroll/:after/:count",
        { after: req.params.after, count: req.params.count },
        req,
        res
      );
    }
  );

  app.get(
    "/registry/search",
    passport.authenticationMiddleware(),
    (req, res) => {
      api.get("/api/registry/search", null, req, res);
    }
  );
};
