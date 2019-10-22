let db = require("../config/services/db");
let lang = require("../config/services/lang");
let i18n = require("i18n");
let validator = require("validator");

let Departments = function() {};

Departments.prototype.calls = {
  create: "create",
  delete: "delete",
  findById: "findById",
  update: "update"
};

Departments.prototype.table = "departments";

Departments.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Departments.validate(data, Departments.prototype.calls.create, req, res)
      .then(() => {
        var sql =
          " INSERT INTO ?? (`name`, `address`, `phone`, `email`, `office`) VALUES (?, ?, ?, ?, ?) ";
        var values = [
          Departments.prototype.table,
          data.name,
          data.address,
          data.phone,
          data.email,
          data.office
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

Departments.delete = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Departments.validate(
      { id: id },
      Departments.prototype.calls.delete,
      req,
      res
    )
      .then(() => {
        Departments.findById(id, req, res)
          .then(rows => {
            var sql = " DELETE FROM ?? WHERE id = ? ";
            var values = [Departments.prototype.table, id];
            db.query(sql, values)
              .then(result => {
                return resolve(result);
              })
              .catch(err => {
                return reject(err);
              });
          })
          .catch(err => {
            return resject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Departments.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate({ id: id }, Departments.prototype.calls.findById, req, res)
      .then(() => {
        var sql = " SELECT * FROM ?? WHERE id = ? ";
        var values = [Departments.prototype.table, id];
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

Departments.list = () => {
  return new Promise((resolve, reject) => {
    var sql = " SELECT * FROM ?? ";
    var values = [Departments.prototype.table];
    db.query(sql, values)
      .then(rows => {
        return resolve(rows);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Departments.update = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Departments.validate(data, Departments.prototype.calls.update, req, res)
      .then(() => {
        var sql =
          " UPDATE ?? SET `name` = ?, `address` = ?, `phone` = ?, `email` = ?, `office` = ? WHERE id = ? ";
        var values = [
          Departments.prototype.table,
          data.name,
          data.address,
          data.phone,
          data.email,
          data.office,
          data.id
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

Departments.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      return reject(new Error(lang.message("Error Departments 007", req, res)));
    } else {
      switch (call) {
        case Departments.prototype.calls.create:
          error = false;
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 2, max: 60 })
          ) {
            console.log(i18n.__("Error Departments 008"));
            error = true;
          }
          if (
            data.address &&
            !validator.isLength(data.address + "", { max: 255 })
          ) {
            console.log(i18n.__("Error Departments 009"));
            error = true;
          }
          if (
            data.phone &&
            (!validator.isInt(data.phone + "") ||
              !validator.isLength(data.phone + "", { min: 9, max: 9 }))
          ) {
            console.log(i18n.__("Error Departments 010"));
            error = true;
          }
          if (
            data.email &&
            (!validator.isLength(data.email + "", { max: 255 }) ||
              !validator.isEmail(data.email + ""))
          ) {
            console.log(i18n.__("Error Departments 011"));
            error = true;
          }
          if (
            data.office &&
            !validator.isLength(data.office + "", { min: 3, max: 3 })
          ) {
            console.log(i18n.__("Error Departments 012"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Departments 013", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Departments.prototype.calls.delete:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Departments 023"));
            return reject(
              new Error(lang.message("Error Departments 024", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Departments.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Departments 014"));
            return reject(
              new Error(lang.message("Error Departments 015", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Departments.prototype.calls.update:
          error = false;
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Departments 016"));
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 2, max: 45 })
          ) {
            console.log(i18n.__("Error Departments 017"));
            error = true;
          }
          if (
            data.address &&
            !validator.isLength(data.address + "", { max: 255 })
          ) {
            console.log(i18n.__("Error Departments 018"));
            error = true;
          }
          if (
            data.phone &&
            (!validator.isInt(data.phone + "") ||
              !validator.isLength(data.phone + "", { min: 9, max: 9 }))
          ) {
            console.log(i18n.__("Error Departments 019"));
            error = true;
          }
          if (
            data.email &&
            (!validator.isLength(data.email + "", { max: 255 }) ||
              !validator.isEmail(data.email + ""))
          ) {
            console.log(i18n.__("Error Departments 020"));
            error = true;
          }
          if (
            data.office &&
            !validator.isLength(data.office + "", { min: 3, max: 3 })
          ) {
            console.log(i18n.__("Error Departments 021"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Departments 022", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        default:
          console.log(i18n.__("Error Departments 025"));
          return reject(
            new Error(lang.message("Error Departments 025", req, res))
          );
      }
    }
  });
};

module.exports = Departments;
