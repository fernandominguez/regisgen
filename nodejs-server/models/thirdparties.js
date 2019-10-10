let db = require("../config/services/db");
let lang = require("../config/services/lang");
let i18n = require("i18n");
let validator = require("validator");

let Thirdparties = function() {};

Thirdparties.prototype.calls = {
  create: "create",
  delete: "delete",
  findById: "findById",
  update: "update"
};

Thirdparties.prototype.table = "thirdparties";

Thirdparties.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Thirdparties.validate(data, Thirdparties.prototype.calls.create, req, res)
      .then(() => {
        var sql =
          " INSERT INTO ?? (`name`, `address`, `phone`, `email`, `identifier`, `islegal`) VALUES ( ?, ?, ?, ?, ?, ?) ";
        var values = [
          Thirdparties.prototype.table,
          data.name,
          data.address,
          data.phone,
          data.email,
          data.identifier,
          data.islegal
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

Thirdparties.delete = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Thirdparties.validate(
      { id: id },
      Thirdparties.prototype.calls.delete,
      req,
      res
    )
      .then(() => {
        Thirdparties.findById(id, req, res)
          .then(rows => {
            var sql = " DELETE FROM ?? WHERE id = ? ";
            var values = [Thirdparties.prototype.table, id];
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
  });
};

Thirdparties.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Thirdparties.validate(data, Registry.prototype.calls.findById, req, res)
      .then(() => {
        var sql = " SELECT * FROM ?? WHERE id = ? ";
        var values = [Thirdparties.prototype.table, id];
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

Thirdparties.list = () => {
  return new Promise((resolve, reject) => {
    var sql = " SELECT * FROM ?? ";
    var values = [Thirdparties.prototype.table];
    db.query(sql, values)
      .then(rows => {
        return resolve(rows);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Thirdparties.update = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Thirdparties.validate(data, Thirdparties.prototype.calls.update, req, res)
      .then(() => {
        sql =
          " UPDATE ?? SET `name` = ?, `address` = ?, `phone` = ?, `email` = ?, `identifier` = ?, `islegal` = ? WHERE id = ? ";
        var values = [
          Thirdparties.prototype.table,
          data.name,
          data.address,
          data.phone,
          data.email,
          data.identifier,
          data.islegal,
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

Thirdparties.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      return reject(
        new Error(lang.message("Error Thirdparties 007", req, res))
      );
    } else {
      switch (call) {
        case Thirdparties.prototype.calls.create:
          error = false;
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 2, max: 45 })
          ) {
            console.log(i18n.__("Error Thirdparties 008"));
            error = true;
          }
          if (
            data.address &&
            !validator.isLength(data.address + "", { max: 255 })
          ) {
            console.log(i18n.__("Error Thirdparties 009"));
            error = true;
          }
          if (
            data.phone &&
            (!validator.isInt(data.phone + "") ||
              !validator.isLength(data.phone + "", { min: 9, max: 9 }))
          ) {
            console.log(i18n.__("Error Thirdparties 010"));
            error = true;
          }
          if (
            data.email &&
            (!validator.isLength(data.email + "", { max: 255 }) ||
              !validator.isEmail(data.email + ""))
          ) {
            console.log(i18n.__("Error Thirdparties 011"));
            error = true;
          }
          if (
            data.identifier &&
            !validator.isLength(data.identifier + "", { max: 20 })
          ) {
            console.log(i18n.__("Error Thirdparties 012"));
            error = true;
          }
          if (!validator.isBoolean(data.islegal + "")) {
            console.log(i18n.__("Error Thirdparties 013"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Thirdparties 014", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Thirdparties.prototype.calls.delete:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Thirdparties 025"));
            return reject(
              new Error(lang.message("Error Thirdparties 026", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Thirdparties.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Thirdparties 015"));
            return reject(
              new Error(lang.message("Error Thirdparties 016", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Thirdparties.prototype.calls.update:
          error = false;
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Thirdparties 017"));
            error = true;
          }
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 2, max: 45 })
          ) {
            console.log(i18n.__("Error Thirdparties 018"));
            error = true;
          }
          if (
            data.address &&
            !validator.isLength(data.address + "", { max: 255 })
          ) {
            console.log(i18n.__("Error Thirdparties 019"));
            error = true;
          }
          if (
            data.phone &&
            (!validator.isInt(data.phone + "") ||
              !validator.isLength(data.phone + "", { min: 9, max: 9 }))
          ) {
            console.log(i18n.__("Error Thirdparties 020"));
            error = true;
          }
          if (
            data.email &&
            (!validator.isLength(data.email + "", { max: 255 }) ||
              !validator.isEmail(data.email + ""))
          ) {
            console.log(i18n.__("Error Thirdparties 021"));
            error = true;
          }
          if (
            data.identifier &&
            !validator.isLength(data.identifier + "", { max: 20 })
          ) {
            console.log(i18n.__("Error Thirdparties 022"));
            error = true;
          }
          if (!validator.isBoolean(data.islegal + "")) {
            console.log(i18n.__("Error Thirdparties 023"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Thirdparties 024", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        default:
          console.log(i18n.__("Error Thirdparties 027"));
          return reject(
            new Error(lang.message("Error Thirdparties 027", req, res))
          );
      }
    }
  });
};

module.exports = Thirdparties;
