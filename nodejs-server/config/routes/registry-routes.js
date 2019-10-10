let registry = require("../../models/registry");
let auth = require("../middleware/auth-middleware");
let crypto = require("crypto");
let fs = require("fs");

module.exports = app => {
  app.delete("/api/registry/:id", auth.authenticate, (req, res) => {
    registry
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/registry", auth.authenticate, (req, res) => {
    registry
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/registry/:id", auth.authenticate, (req, res) => {
    registry
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows[0]);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get(
    "/api/registry/scroll/:after/:count",
    auth.authenticate,
    (req, res) => {
      registry
        .scroll(req.query.after, req.query.count, req, res)
        .then(rows => {
          res.status(200).json(rows);
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  );

  app.get("/api/registry/search", auth.authenticate, (req, res) => {
    registry
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/registry-files/:id", auth.authenticate, (req, res) => {
    registry
      .findFiles(req.query.id, req, res)
      .then(rows => {
        res.status(200).json({ data: rows });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/registry", auth.authenticate, (req, res) => {
    registry
      .create(req.body.data.data, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.put("/api/registry", auth.authenticate, (req, res) => {
    registry
      .update(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.put("/api/registry-files", auth.authenticate, (req, res) => {
    registry
      .updateFiles(req.body.data.data, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};
