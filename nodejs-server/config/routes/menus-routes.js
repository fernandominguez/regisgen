let auth = require("../middleware/auth-middleware");
let menus = require("../../models/menus");

module.exports = app => {
  app.delete("/api/menu/:id", auth.authenticate, (req, res) => {
    menus
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/menu/:id", auth.authenticate, (req, res) => {
    menus
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/menu", auth.authenticate, (req, res) => {
    menus
      .create(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ messsage: err.message });
      });
  });

  app.put("/api/menu", auth.authenticate, (req, res) => {
    menus
      .update(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/menu-crude/:menu/:role", auth.authenticate, (req, res) => {
    menus
      .crude(req.query.menu, req.query.role, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/menus/", auth.authenticate, (req, res) => {
    menus
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/menus/others/:id", auth.authenticate, (req, res) => {
    menus
      .findOthers(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/tree", auth.authenticate, (req, res) => {
    menus
      .tree(req.query.role, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};
