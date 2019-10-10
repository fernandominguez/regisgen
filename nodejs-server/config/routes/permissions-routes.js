let auth = require("../middleware/auth-middleware");
let permissions = require("../../models/permissions");

module.exports = app => {
  app.delete("/api/permission/:id", auth.authenticate, (req, res) => {
    permissions
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/permission/:id", auth.authenticate, (req, res) => {
    permissions
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/permission", auth.authenticate, (req, res) => {
    permissions
      .create(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ messsage: err.message });
      });
  });

  app.put("/api/permission", auth.authenticate, (req, res) => {
    permissions
      .update(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/permissions", auth.authenticate, (req, res) => {
    permissions
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};
