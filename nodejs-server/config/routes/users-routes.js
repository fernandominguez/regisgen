let auth = require("../middleware/auth-middleware");
let lang = require("../services/lang");
let users = require("../../models/users");

module.exports = app => {
  app.delete("/api/user/:id", auth.authenticate, (req, res) => {
    users
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  });

  app.get("/api/user/:id", auth.authenticate, (req, res) => {
    users
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows[0]);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/user/:id/:role", auth.authenticate, (req, res) => {
    users
      .findByIdAndRole(req.query.id, req.query.role, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/users/", auth.authenticate, (req, res) => {
    users
      .list()
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });

  app.get("/api/user-permissions/:id", auth.authenticate, (req, res) => {
    users
      .findPermissions(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/user-roles/:id", auth.authenticate, (req, res) => {
    users
      .findRoles(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/user", auth.authenticate, (req, res) => {
    var user = req.body.data.data ? JSON.parse(req.body.data.data) : undefined;
    if (!user || !user.username || !user.password) {
      res
        .status(500)
        .send({ message: lang.message("Error Api/User[POST] 001", req, res) });
    } else {
      users
        .findByUsername(user.username, req, res)
        .then(rows => {
          if (rows && rows.length > 0) {
            res.status(500).send({
              message: lang.message("Error Api/User[POST] 001", req, res)
            });
          } else {
            const User = {
              username: user.username,
              password: user.password,
              repassword: user.repassword,
              name: user.name,
              surname: user.surname,
              birthday: user.birthday,
              email: user.email,
              phone: user.phone,
              mobile: user.mobile,
              address: user.address
            };
            console.log(User);
            users
              .create(User, req, res)
              .then(rows => {
                User.id = rows.insertId;
                res.status(200).json({ data: User });
              })
              .catch(err => {
                console.log(err);
                res
                  .status(500)
                  .send({ message: lang.message(err.message, req, res) });
              });
          }
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  });

  app.put("/api/user", auth.authenticate, (req, res) => {
    users
      .update(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.put("/api/user-permissions", auth.authenticate, (req, res) => {
      users
      .updatePermissions(JSON.parse(req.body.data.data), req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};
