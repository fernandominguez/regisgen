let thirdparties = require("../../models/thirdparties");
let auth = require("../middleware/auth-middleware");

module.exports = app => {
  app.get("/api/thirdparties", auth.authenticate, (req, res) => {
    thirdparties
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.delete("/api/thirdparty/:id", auth.authenticate, (req, res) => {
    thirdparties
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/thirdparty/:id", auth.authenticate, (req, res) => {
    thirdparties
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/thirdparty", auth.authenticate, (req, res) => {
    thirdparties
      .create(req.body.data.data, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.put("/api/thirdparty", auth.authenticate, (req, res) => {
    thirdparties
      .update(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};
