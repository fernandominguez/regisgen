let db = require("../config/services/db");
let permissions = require("./permissions");
let lang = require("../config/services/lang");
let dateformat = require("dateformat");
let moment = require("moment");
let validator = require("validator");

let User = function() {};

User.prototype.calls = {
  create: "create",
  delete: "delete",
  findById: "findById",
  findByIdAndRole: "findByIdAndRole",
  findByUsername: "findByUsername",
  findPermissions: "findPermissions",
  findRoles: "findRoles",
  update: "update",
  updatePermissions: "updatePermissions"
};

User.prototype.table = "users";
User.prototype.table_permissions = "users-permissions";

User.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate(data, User.prototype.calls.create, req, res)
      .then(() => {
        var sql =
          " INSERT INTO ?? (username, password, name, surname, email, phone, mobile, address, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d %H:%i:%S.%f'))";
        var values = [
          User.prototype.table,
          data.username,
          data.password,
          data.name,
          data.surname,
          data.email,
          data.phone,
          data.mobile,
          data.address,
          dateformat(moment(data.birthday, "YYYY-MM-DD"), "yyyy-mm-dd")
        ];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.delete = (id, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate({ id: id }, User.prototype.calls.delete, req, res)
      .then(() => {
        User.findById(id, req, res)
          .then(rows => {
            if (rows.length > 0) {
              var sql = " DELETE FROM ?? WHERE `id-user` = ? ";
              var values = [User.prototype.table_permissions, id];
              db.query(sql, values)
                .this(result => {
                  var sql = " DELETE FROM ?? WHERE id = ? ";
                  var values = [User.prototype.table, id];
                  db.query(sql, values)
                    .then(result => {
                      return resolve(true);
                    })
                    .catch(err => {
                      return reject(err);
                    });
                })
                .catch(err => {
                  return reject(err);
                });
            } else {
              console.log("Error users.delete(id): Id user not found.");
              return reject(
                new Error(lang.message("Error Users 001", req, res))
              );
            }
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate({ id: id }, User.prototype.calls.findById, req, res)
      .then(() => {
        var sql =
          " SELECT id, username, password, name, surname, email, phone, mobile, address, DATE_FORMAT(birthday, '%d/%m/%Y') as birthday FROM ?? WHERE id = ? ";
        var values = [User.prototype.table, id];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.findByIdAndRole = (id, role, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate(
      { id: id, role: role },
      User.prototype.calls.findByIdAndRole,
      req,
      res
    )
      .then(() => {
        var sql =
          " SELECT u.`id`, u.`username`, u.`name`, u.`surname`, u.`email`, u.`phone`, u.`mobile`, u.`address`, u.`birthday`, p.`id` roleId, p.`name` roleName FROM ?? u LEFT JOIN ?? up ON u.`id` = up.`id-user` LEFT JOIN ?? p ON up.`id-permission` = p.`id` WHERE u.`id` = ? AND p.`id` = ? ";
        var values = [
          User.prototype.table,
          User.prototype.table_permissions,
          permissions.prototype.table,
          id,
          role
        ];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.findByUsername = (username, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate(
      { username: username },
      User.prototype.calls.findByUsername,
      req,
      res
    )
      .then(() => {
        var sql = " SELECT * FROM ?? WHERE username = ? ";
        var values = [User.prototype.table, username];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.findPermissions = (id, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate({ id: id }, User.prototype.calls.findPermissions, req, res)
      .then(() => {
        var sql = " SELECT * FROM ?? WHERE `id-user` = ? ";
        var values = [User.prototype.table_permissions, id];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.findRoles = (id, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate({ id: id }, User.prototype.calls.findRoles, req, res)
      .then(() => {
        var sql =
          " SELECT a.`id`, a.`name` FROM ?? a LEFT JOIN ?? b ON a.`id` = b.`id-permission` WHERE b.`id-user` = ? ";
        var values = [
          permissions.prototype.table,
          User.prototype.table_permissions,
          id
        ];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.list = () => {
  return new Promise((resolve, reject) => {
    var sql =
      " SELECT id, username, name, surname, email, phone, mobile, address, birthday FROM ?? ";
    var values = [User.prototype.table];
    db.query(sql, values)
      .then(rows => {
        return resolve(rows);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.update = (data, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate(data, User.prototype.calls.update, req, res)
      .then(() => {
        var sql =
          " UPDATE ?? SET username = ?, name = ?, surname = ?, email = ?, phone = ?, mobile = ?, address = ?, password = ?, birthday = STR_TO_DATE(?, '%Y-%m-%d %H:%i:%S.%f') WHERE id = ? ";
        var values = [
          User.prototype.table,
          data.username,
          data.name,
          data.surname,
          data.email,
          data.phone,
          data.mobile,
          data.address,
          (data.newpassword ? data.newpassword : data.password),
          dateformat(moment(data.birthday, "YYYY-MM-DD"), "yyyy-mm-dd"),
          data.id
        ];
        db.query(sql, values)
          .then(result => {
            return resolve(result);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.updatePermissions = (data, req, res) => {
  return new Promise((resolve, reject) => {
    User.validate(data, User.prototype.calls.updatePermissions, req, res)
      .then(() => {
        var sql = " DELETE FROM ?? WHERE `id-user` = ? ";
        var values = [User.prototype.table_permissions, data.id];
        db.query(sql, values)
          .then(result => {
            var sql =
              " INSERT INTO ?? (`id-user`, `id-permission`) VALUES (?, ?) ";
            data.permissions.forEach(function(permission) {
              if (permission.isChecked) {
                var values = [
                  User.prototype.table_permissions,
                  data.id,
                  permission.id
                ];
                db.query(sql, values).catch(err => {
                  return reject(err);
                });
              }
            });
            return resolve(result);
          })
          .catch(err => {
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

User.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      console.log("Error users.validate(data, call): Invalid data.");
      return reject(new Error(lang.message("Error Users 002", req, res)));
    } else {
      switch (call) {
        case User.prototype.calls.create:
          var error = false;
          if (
            !data.username ||
            !validator.isLength(data.username + "", { min: 8, max: 45 })
          ) {
            console.log(
              'Error users.validate(data, "create"): Invalid username.'
            );
            error = true;
          }
          if (
            !data.password ||
            !data.repassword ||
            (validator.isEmpty(data.password + "") &&
              !validator.isEmpty(data.repassword + "")) ||
            (validator.isEmpty(data.repassword + "") &&
              !validator.isEmpty(data.password + "")) ||
            !validator.equals(data.password + "", data.repassword + "")
          ) {
            console.log(
              'Error users.validate(data, "create"): Ivalid password.'
            );
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 45 })
          ) {
            console.log('Error users.validate(data, "create"): Invalid name.');
            error = true;
          }
          if (
            !data.surname ||
            !validator.isLength(data.surname + "", { min: 3, max: 45 })
          ) {
            console.log(
              'Error users.validate(data, "create"): Invalid surname.'
            );
            error = true;
          }
          if (data.birthday) {
            if (!validator.isLength(data.birthday + "", { min: 10, max: 22 })) {
              console.log(
                'Error users.validate(data, "create"): Invalid birthday.'
              );
              error = true;
            }
            var date = moment(data.birthday, "YYYY-MM-DD");
            var birthday = dateformat(date, "yyyy-mm-dd");
            if (!validator.isISO8601(birthday + "")) {
              console.log(
                'Error users.validate(data, "create"): Invalid birthday.'
              );
              error = true;
            }
          }
          if (
            !data.email ||
            !validator.isLength(data.email + "", { min: 1, max: 255 }) ||
            !validator.isEmail(data.email + "")
          ) {
            console.log('Error users.validate(data, "create"): Invalid email.');
            error = true;
          }
          if (
            !validator.isInt(data.phone + "") ||
            !validator.isLength(data.phone + "", { min: 9, max: 9 })
          ) {
            console.log('Error users.validate(data, "create"): Invalid phone.');
            error = true;
          }
          if (
            !validator.isInt(data.mobile + "") ||
            !validator.isLength(data.mobile + "", { min: 9, max: 9 })
          ) {
            console.log(
              'Error users.validate(data, "create"): Invalid mobile.'
            );
            error = true;
          }
          if (
            !data.address ||
            !validator.isLength(data.address + "", { min: 10, max: 255 })
          ) {
            console.log(
              'Error users.validate(data, "create"): Invalid address.'
            );
            error = true;
          }
          if (error) {
            return reject(new Error(lang.message("Error Users 003", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.delete:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Users 004", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Users 005", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.findByIdAndRole:
          var error = false;
          if (!validator.isInt(data.id + "")) {
            console.log(
              'Error users.validate(data, "findByIdAndRole"): Invalid id.'
            );
            error = true;
          }
          if (!validator.isInt(data.role + "")) {
            console.log(
              'Error users.validate(data, "findByIdAndRole"): Invalid role.'
            );
            error = true;
          }
          if (error) {
            return reject(new Error(lang.message("Error Users 005", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.findByUsername:
          if (
            !data.username ||
            !validator.isLength(data.username + "", { min: 8, max: 45 })
          ) {
            return reject(new Error(lang.message("Error Users 005", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.findPermissions:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Users 005", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.findRoles:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Users 005", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.update:
          var error = false;
          if (!validator.isInt(data.id + "")) {
            console.log('Error users.validate(data, "update"): Invalid id.');
            error = true;
          }
          if (
            !data.username ||
            !validator.isLength(data.username + "", { min: 8, max: 45 })
          ) {
            console.log(
              'Error users.validate(data, "update"): Invalid username.'
            );
            error = true;
          }
          if (
            (data.newpassword && !data.repassword) ||
            (!data.newpassword && data.repassword) ||
            ((validator.isEmpty(data.newpassword + "") &&
              !validator.isEmpty(data.repassword + "")) ||
              (validator.isEmpty(data.repassword + "") &&
                !validator.isEmpty(data.newpassword + "")) ||
              !validator.equals(data.newpassword + "", data.repassword + ""))
          ) {
            console.log(
              'Error users.validate(data, "update"): Invalid password.'
            );
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 45 })
          ) {
            console.log('Error users.validate(data, "update"): Invalid name.');
            error = true;
          }
          if (
            !data.surname ||
            !validator.isLength(data.surname + "", { min: 3, max: 45 })
          ) {
            console.log(
              'Error users.validate(data, "update"): Invalid surname.'
            );
            error = true;
          }
          if (data.birthday) {
            if (!validator.isLength(data.birthday + "", { min: 10, max: 22 })) {
              console.log(
                'Error users.validate(data, "update"): Invalid birthday.'
              );
              error = true;
            }
            var date = moment(data.birthday, "YYYY-MM-DD");
            var birthday = dateformat(date, "yyyy-mm-dd");
            if (!validator.isISO8601(birthday + "")) {
              console.log(
                'Error users.validate(data, "update"): Invalid birthday.'
              );
              error = true;
            }
          }
          if (
            !data.email ||
            !validator.isLength(data.email + "", { min: 1, max: 255 }) ||
            !validator.isEmail(data.email + "")
          ) {
            console.log('Error users.validate(data, "update"): Invalid email.');
            error = true;
          }
          if (
            !validator.isInt(data.phone + "") ||
            !validator.isLength(data.phone + "", { min: 9, max: 9 })
          ) {
            console.log('Error users.validate(data, "update"): Invalid phone.');
            error = true;
          }
          if (
            !validator.isInt(data.mobile + "") ||
            !validator.isLength(data.mobile + "", { min: 9, max: 9 })
          ) {
            console.log(
              'Error users.validate(data, "update"): Invalid mobile.'
            );
            error = true;
          }
          if (
            !data.address ||
            !validator.isLength(data.address + "", { min: 10, max: 255 })
          ) {
            console.log(
              'Error users.validate(data, "update"): Invalid address.'
            );
            error = true;
          }
          if (error) {
            return reject(new Error(lang.message("Error Users 006", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case User.prototype.calls.updatePermissions:
          var error = false;
          if (!validator.isInt(data.id + "")) {
            console.log(
              'Error users.validate(data, "updatePermissions"): Invalid id.'
            );
            error = true;
          }
          if (error) {
            return reject(new Error(lang.message("Error Users 007", req, res)));
          } else {
            return resolve(true);
          }
          break;
        default:
          console.log("Error users.validate(data, call): Call no válido.");
          return reject(new Error(lang.message("Error Users 002", req, res)));
      }
    }
  });
};

module.exports = User;
