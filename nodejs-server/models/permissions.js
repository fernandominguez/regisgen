let db = require("../config/services/db");
let lang = require("../config/services/lang");
let validator = require("validator");

let Permission = function() {};

Permission.prototype.calls = {
  create: "create",
  delete: "delete",
  findById: "findById",
  update: "update"
};

Permission.prototype.table = "permissions";
Permission.prototype.table_permissions_menus = "permissions-menus";
Permission.prototype.table_users_permissions = "users-permissions";

Permission.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Permission.validate(data, Permission.prototype.calls.create, req, res)
      .then(() => {
        var sql = " INSERT INTO ?? (name, lang) VALUES (?, ?) ";
        var values = [Permission.prototype.table, data.name, lang.getLocale(req, res)];
        db.query(sql, values)
          .then(rows => {
            var permissionId = rows.insertId;
            var sql = " DELETE FROM ?? WHERE `id-permission` = ? ";
            var values = [
              Permission.prototype.table_permissions_menus,
              data.id
            ];
            db.query(sql, values)
              .then(result => {
                var sql =
                  " INSERT INTO ?? (`id-permission`, `id-menu`, `crude`) VALUES (?, ?, ?) ";
                data.menus.forEach(function(menu) {
                  var crude =
                    (menu.isCreate ? "c" : "") +
                    (menu.isRead ? "r" : "") +
                    (menu.isUpdate ? "u" : "") +
                    (menu.isDelete ? "d" : "") +
                    (menu.isExecute ? "e" : "");
                  if (crude != "") {
                    var values = [
                      Permission.prototype.table_permissions_menus,
                      permissionId,
                      menu.id,
                      crude
                    ];
                    db.query(sql, values).catch(err => {
                      return reject(err);
                    });
                  }
                });
                return resolve(rows);
              })
              .catch(err => {
                return reject(err);
              });
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

Permission.delete = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Permission.validate({ id: id }, Permission.prototype.calls.delete, req, res)
      .then(() => {
        Permission.findById(id, req, res)
          .then(rows => {
            var sql = " DELETE FROM ?? WHERE id = ? ";
            var values = [Permission.prototype.table, id];
            db.query(sql, values)
              .then(result => {
                var sql = " DELETE FROM ?? WHERE `id-permission` = ? ";
                var values = [Permission.prototype.table_permissions_menus, id];
                db.query(sql, values)
                  .then(result => {
                    var sql = " DELETE FROM ?? WHERE `id-permission` = ? ";
                    var values = [
                      Permission.prototype.table_users_permissions,
                      id
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
              })
              .catch(err => {
                return reject(err);
              });
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

Permission.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Permission.validate({ id: id }, Permission.prototype.calls.findById, req, res)
      .then(() => {
        var sql = " SELECT * FROM ?? WHERE id = ? ";
        var values = [Permission.prototype.table, id];
        db.query(sql, values)
          .then(rows => {
            var permission = rows[0];
            var sql = " SELECT * FROM ?? WHERE `id-permission` = ? ";
            var values = [Permission.prototype.table_permissions_menus, id];
            db.query(sql, values)
              .then(rows => {
                permission.menus = rows;
                return resolve(permission);
              })
              .catch(err => {
                return reject(err);
              });
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

Permission.list = (req, res) => {
  return new Promise((resolve, reject) => {
    var sql = " SELECT * FROM ?? WHERE lang = ? ";
    var values = [Permission.prototype.table, lang.getLocale(req, res)];
    db.query(sql, values)
      .then(rows => {
        return resolve(rows);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Permission.update = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Permission.validate(data, Permission.prototype.calls.update, req, res)
      .then(() => {
        var sql = " UPDATE ?? SET name = ? WHERE id = ? AND lang = ? ";
        var values = [Permission.prototype.table, data.name, data.id, lang.getLocale(req, res)];
        db.query(sql, values)
          .then(rows => {
            var sql = " DELETE  FROM ?? WHERE `id-permission` = ? ";
            var values = [
              Permission.prototype.table_permissions_menus,
              data.id
            ];
            db.query(sql, values)
              .then(result => {
                var sql =
                  " INSERT INTO ?? (`id-permission`, `id-menu`, `crude`) VALUES (?, ?, ?) ";
                data.menus.forEach(function(menu) {
                  var crude =
                    (menu.isCreate ? "c" : "") +
                    (menu.isRead ? "r" : "") +
                    (menu.isUpdate ? "u" : "") +
                    (menu.isDelete ? "d" : "") +
                    (menu.isExecute ? "e" : "");
                  if (crude != "") {
                    var values = [
                      Permission.prototype.table_permissions_menus,
                      data.id,
                      menu.id,
                      crude
                    ];
                    db.query(sql, values).catch(err => {
                      return reject(err);
                    });
                  }
                });
              })
              .catch(err => {
                return reject(err);
              });
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

Permission.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      return reject(new Error(lang.message("Error Permissions 001", req, res)));
    } else {
      switch (call) {
        case Permission.prototype.calls.create:
          error = false;
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 45 })
          ) {
            console.log(
              '"Error permissions.validate(data, "create"): Invalid name.'
            );
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Permissions 002", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Permission.prototype.calls.delete:
          if (!validator.isInt(data.id + "")) {
            return reject(
              new Error(lang.message("Error Permissions 003", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Permission.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            return reject(
              new Error(lang.message("Error Permissions 004", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Permission.prototype.calls.update:
          error = false;
          if (!validator.isInt(data.id + "")) {
            console.log(
              'Error permissions.validate(data, "update"): Invalid id.'
            );
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 45 })
          ) {
            console.log(
              'Error permissions.valdiate(data, "update"): Invalid name.'
            );
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Permissions 005", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        default:
          return reject(
            new Error(lang.message("Error Permissions 001", req, res))
          );
      }
    }
  });
};

module.exports = Permission;
