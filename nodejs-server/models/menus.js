let db = require("../config/services/db");
let lang = require("../config/services/lang");
let validator = require("validator");

let Menu = function() {};

Menu.prototype.calls = {
  create: "create",
  crude: "crude",
  delete: "delete",
  findById: "findById",
  findOthers: "findOthers",
  findTree: "findTree",
  update: "update"
};

Menu.prototype.table = "menus";
Menu.prototype.view = "v-menus-tree";
Menu.prototype.table_permissions_menus = "permissions-menus";

Menu.children = (menus, parent) => {
  var children = [];
  for (var i = 0; i < menus.length; i++) {
    if (menus[i].parentId == parent) {
      var branch = {
        id: menus[i].childId,
        name: menus[i].childName,
        icon: menus[i].childIcon,
        href: menus[i].childHref,
        crude: menus[i].crude,
        children: null
      };
      if (menus[i].parentId) {
        branch.children = Menu.children(menus, menus[i].childId);
      }
      children.push(branch);
    }
  }
  return children;
};

Menu.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate(data, Menu.prototype.calls.create, req, res)
      .then(() => {
        var sql =
          " INSERT INTO ?? (parent, name, icon, href, `order`, lang) VALUES (?, ?, ?, ?, ?, ?) ";
        var values = [
          Menu.prototype.table,
          data.parent,
          data.name,
          data.icon,
          data.href,
          data.order,
          lang.getLocale(req, res),
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

Menu.crude = (id, role, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate({ id: id }, Menu.prototype.calls.crude, req, res)
      .then(() => {
        var sql =
          " SELECT `crude` FROM `v-menus-tree` WHERE `childId` = ? AND `role` = ? AND `childLang`= ?";
        var values = [id, role, lang.getLocale(req, res)];
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

Menu.delete = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate({ id: id }, Menu.prototype.calls.delete, req, res)
      .then(() => {
        Menu.findById(id, req, res)
          .then(rows => {
            var sql = " DELETE FROM ?? WHERE id = ? ";
            var values = [Menu.prototype.table, id];
            db.query(sql, values)
              .then(rows => {
                var sql = " DELETE FROM ?? WHERE `id-menu` = ? ";
                var values = [Menu.prototype.table_permissions_menus, id];
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

Menu.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate({ id: id }, Menu.prototype.calls.findById, req, res)
      .then(() => {
        var sql =
          " SELECT a.id, a.parent, b.name as parentName, b.icon as parentIcon, a.name, a.icon, a.href, a.`order`, a.lang FROM ?? a LEFT OUTER JOIN ?? b ON b.id = a.parent WHERE a.id = ? ";
        var values = [Menu.prototype.table, Menu.prototype.table, id];
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

Menu.findOthers = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate({ id: id }, Menu.prototype.calls.findOthers, req, res)
      .then(() => {
        var sql = " SELECT `id`, `name`, `icon` FROM ?? WHERE `id` != ? AND lang = ? ";
        var values = [Menu.prototype.table, id, lang.getLocale(req, res)];
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

Menu.findTree = (role, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate({ role: role }, Menu.prototype.calls.findTree, req, res)
      .then(() => {
        var sql = " SELECT * FROM ?? WHERE `role` = ? AND `childLang` = ? ";
        var values = [Menu.prototype.view, role, lang.getLocale(req, res)];
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

Menu.list = (req, res) => {
  return new Promise((resolve, reject) => {
    var sql =
      " SELECT a.id, b.name as parentName, a.name, a.icon, a.href, a.`order` FROM ?? a LEFT OUTER JOIN ?? b ON b.id = a.parent WHERE a.lang = ? ";
    var values = [Menu.prototype.table, Menu.prototype.table, lang.getLocale(req, res)];
    db.query(sql, values)
      .then(rows => {
        return resolve(rows);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Menu.tree = (role, req, res) => {
  return new Promise((resolve, reject) => {
    var tree = [];
    Menu.findTree(role, req, res)
      .then(rows => {
        for (var i = 0; i < rows.length; i++) {
          var branch = {
            id: rows[i].childId,
            name: rows[i].childName,
            icon: rows[i].childIcon,
            href: rows[i].childHref,
            crude: rows[i].crude,
            children: null
          };
          if (!rows[i].parentId) {
            branch.children = Menu.children(rows, rows[i].childId);
            tree.push(branch);
          }
        }
        return resolve(tree);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Menu.update = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Menu.validate(data, Menu.prototype.calls.update, req, res)
      .then(() => {
        var sql =
          " UPDATE ?? SET parent = ?, name = ?, icon = ?, href = ?, `order` = ? WHERE id = ? AND lang = ? ";
        var values = [
          Menu.prototype.table,
          data.parent,
          data.name,
          data.icon,
          data.href,
          data.order,
          data.id,
          lang.getLocale(req, res)
        ];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            console.log(err);
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Menu.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      return reject(new Error(lang.message("Error Menus 001", req, res)));
    } else {
      switch (call) {
        case Menu.prototype.calls.create:
          error = false;
          if (data.parent && !validator.isInt(data.parent + "")) {
            console.log(
              'Error menus.validate(data, "create"): Invalid parent.'
            );
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 45 })
          ) {
            console.log('Error menus.validate(data, "create"): Invalid name.');
            error = true;
          }
          if (
            !data.icon ||
            !validator.isLength(data.icon + "", { min: 2, max: 45 })
          ) {
            console.log('Error menus.validate(data, "create"): Invalid icon.');
            error = true;
          }
          if (
            !data.href ||
            !validator.isLength(data.href + "", { min: 1, max: 255 })
          ) {
            console.log('Error menus.validate(data, "create"): Invalid href.');
            error = true;
          }
          if (!validator.isInt(data.order + "")) {
            console.log('Error menus.validate(data, "create"): Invalid order.');
            error = true;
          }
          if (error) {
            return reject(new Error(lang.message("Error Menus 002", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Menu.prototype.calls.crude:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Menus 003", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Menu.prototype.calls.delete:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Menus 004", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Menu.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Menus 003", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Menu.prototype.calls.findOthers:
          if (!validator.isInt(data.id + "")) {
            return reject(new Error(lang.message("Error Menus 003", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Menu.prototype.calls.findTree:
          if (!validator.isInt(data.role + "")) {
            return reject(new Error(lang.message("Error Menus 003", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Menu.prototype.calls.update:
          error = false;
          if (!validator.isInt(data.id + "")) {
            console.log('Error menus.validate(data, "update"): Invalid id.');
            error = true;
          }
          if (data.parent && !validator.isInt(data.parent + "")) {
            console.log(
              'Error menus.validate(data, "update"): Invalid parent.'
            );
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 45 })
          ) {
            console.log('Error menus.validate(data, "update"): Invalid name.');
            error = true;
          }
          if (
            !data.icon ||
            !validator.isLength(data.icon + "", { min: 2, max: 45 })
          ) {
            console.log('Error menus.validate(data, "update"): Invalid icon.');
            error = true;
          }
          if (
            !data.href ||
            !validator.isLength(data.href + "", { min: 1, max: 255 })
          ) {
            console.log('Error menus.validate(data, "update"): Invalid href.');
            error = true;
          }
          if (!validator.isInt(data.order + "")) {
            console.log('Error menus.validate(data, "update"): Invalid order.');
            error = true;
          }
          if (error) {
            return reject(new Error(lang.message("Error Menus 005", req, res)));
          } else {
            return resolve(true);
          }
          break;
        default:
          return reject(new Error(lang.message("Error Menus 001", req, res)));
      }
    }
  });
};

module.exports = Menu;
