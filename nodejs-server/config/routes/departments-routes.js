let departments = require("../../models/departments");
let auth = require("../middleware/auth-middleware");

module.exports = app => {
  app.delete("/api/department/:id", auth.authenticate, (req, res) => {
    departments
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/department/:id", auth.authenticate, (req, res) => {
    departments
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/department", auth.authenticate, (req, res) => {
    departments
      .create(req.body.data.data, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.put("/api/department", auth.authenticate, (req, res) => {
    departments
      .update(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/departments", auth.authenticate, (req, res) => {
    departments
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};
