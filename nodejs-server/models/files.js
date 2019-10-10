let db = require("../config/services/db");
let lang = require("../config/services/lang");
let crypto = require("crypto");
let fs = require("fs");
let i18n = require("i18n");
let validator = require("validator");

let Files = function() {};

Files.prototype.calls = {
  create: "create",
  delete: "delete",
  findById: "findById",
  findContentById: "findContentById"
};

Files.prototype.table = "files";

Files.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Files.validate(data, Files.prototype.calls.create, req, res)
      .then(() => {
        var sql =
          " INSERT INTO ?? (`name`, `type`, `size`, `content`, `checksum`) VALUES (?, ?, ?, ?, ?) ";
        var values = [
          Files.prototype.table,
          data.name,
          data.type,
          data.size,
          data.content,
          data.checksum
        ];
        db.query(sql, values)
          .then(rows => {
            fs.unlink(data.path, function(err, res) {
              return resolve(rows);
            });
          })
          .catch(err => {
            console.log("%s: %s", i18n.__("Error Files 001"), err);
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Files.delete = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Files.validate({ id: id }, Files.prototype.calls.delete, req, res)
      .then(() => {
        Files.findById(id, req, res)
          .then(rows => {
            var sql = " DELETE FROM ?? WHERE id = ? ";
            var values = [Files.prototype.table, id];
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

Files.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Files.validate({ id: id }, Files.prototype.calls.findById, req, res)
      .then(() => {
        var sql =
          " SELECT `name`, `type`, `size`, `checksum` FROM ?? WHERE `id` = ? ";
        var values = [Files.prototype.table, id];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            console.log("%s: %s", i18n.__("Error Files 003"), err);
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Files.findContentById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Files.validate({ id: id }, Files.prototype.calls.findContentById, req, res)
      .then(() => {
        var sql =
          " SELECT `type`, `size`, `checksum`, `content` FROM ?? WHERE `id` = ? ";
        var values = [Files.prototype.table, id];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            console.log("%s: %s", i18n.__("Error Files 004"), err);
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Files.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      return reject(new Error(lang.message("Error Files 005", req, res)));
    } else {
      switch (call) {
        case Files.prototype.calls.create:
          error = false;
          if (
            !data.name ||
            !validator.isLength(data.name + "", { min: 3, max: 255 })
          ) {
            console.log(i18n.__("Error Files 006"));
            error = true;
          }
          if (
            !data.type ||
            !validator.isLength(data.type + "", { min: 1, max: 255 })
          ) {
            console.log(i18n.__("Error Files 007"));
            error = true;
          }
          if (!data.size || !validator.isDecimal(data.size + "")) {
            console.log(i18n.__("Error Files 008"));
            error = true;
          }
          if (
            !data.content ||
            !validator.isLength(data.content + "", { min: 1, max: 16777215 })
          ) {
            console.log(i18n.__("Error Files 009"));
            error = true;
          }
          if (
            !data.checksum ||
            !validator.isLength(data.checsum + "", { min: 1, max: 40 })
          ) {
            console.log(i18n.__("Error Files 010"));
            error = true;
          }
          if (data.content && data.checksum) {
            var shasum = crypto.createHash("sha1");
            shasum.update(data.content);
            if (shasum.digest("hex") != data.checksum) {
              console.log(i18n.__("Error files 010"));
              error = true;
            }
          }
          if (error) {
            return reject(new Error(lang.message("Error Files 011", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Files.prototype.calls.delete:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Files 012"));
            return reject(new Error(lang.message("Error Files 012", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Files.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Files 013"));
            return reject(new Error(lang.message("Error Files 013", req, res)));
          } else {
            return resolve(true);
          }
          break;
        case Files.prototype.calls.findContentById:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Files 014"));
            return reject(new Error(lang.message("Error Files 014", req, res)));
          } else {
            return resolve(true);
          }
          break;
        default:
          console.log(i18n.__("Error Files 012"));
          return reject(new Error(lang.message("Error Files 015", req, res)));
      }
    }
  });
};

module.exports = Files;
