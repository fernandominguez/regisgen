let config = require("../config/config");
let db = require("../config/services/db");
let lang = require("../config/services/lang");
let Files = require("../models/files");
let crypto = require("crypto");
let fs = require("fs");
let i18n = require("i18n");
let validator = require("validator");

let Registry = function() {};

Registry.prototype.calls = {
  create: "create",
  findById: "findById",
  findFiles: "findFiles",
  scroll: "scroll",
  update: "update",
  updateFiles: "updateFiles"
};

Registry.prototype.table = "registry";
Registry.prototype.table_files = "registry-files";

Registry.create = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate(data, Registry.prototype.calls.create, req, res)
      .then(() => {
        var sql = " CALL initRegistrySequence(?, ?, YEAR(NOW()), 1, 1) ";
        var values = [data.type, data.subtype];
        db.query(sql, values)
          .then(result => {
            var sql =
              " INSERT INTO ?? (`number`, `type`, `subtype`, `date`, `title`, `content`, `origin`, `destiny`, `channel`, `tag`, `state`) VALUES (CONCAT(registryNextNumber(?, ?, YEAR(NOW())), CONCAT('/', YEAR(NOW()))), ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?) ";
            var values = [
              Registry.prototype.table,
              data.type,
              data.subtype,
              data.type,
              data.subtype,
              data.title,
              data.content,
              data.origin,
              data.destiny,
              data.channel,
              data.tag,
              data.state
            ];
            db.query(sql, values)
              .then(rows => {
                return resolve(rows);
              })
              .catch(err => {
                console.log("%s: %s", i18n.__("Error Registry 004"), err);
                return reject(err);
              });
          })
          .catch(err => {
            console.log("%s: %s", i18n.__("Error Registry 004"), err);
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Registry.findById = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate({ id: id }, Registry.prototype.calls.findById, req, res)
      .then(() => {
        var sql =
          "    SELECT r.`id`, r.`number`, r.`type`, r.`subtype`, r.`date`, " +
          "           DATE_FORMAT(r.`date`, '%d/%m/%Y %H:%i:%s') dateFormat, " +
          "           r.`title`, r.`content`, " +
          "           r.`origin`, torigin.`name` originThirdpartyName, dorigin.`name` originDepartmentName, " +
          "           r.`destiny`, tdestiny.`name` destinyThirdpartyName, ddestiny.`name` destinyDepartmentName, " +
          "           r.`channel`, r.`tag`, r.`state`, COUNT(DISTINCT(rfiles.`id-file`)) numfiles " +
          "      FROM ?? r " +
          " LEFT JOIN thirdparties torigin ON r.`origin` = torigin.`id` " +
          " LEFT JOIN thirdparties tdestiny ON r.`destiny` = tdestiny.`id` " +
          " LEFT JOIN departments dorigin ON r.`origin` = dorigin.`id` " +
          " LEFT JOIN departments ddestiny ON r.`destiny` = ddestiny.`id` " +
          " LEFT JOIN `registry-files` rfiles ON r.`id` = rfiles.`id-registry` " +
          "     WHERE r.`id` = ?" +
          "  GROUP BY r.`id` " +
          "  ORDER BY r.`id` ";
        var values = [Registry.prototype.table, id];
        db.query(sql, values)
          .then(rows => {
            return resolve(rows);
          })
          .catch(err => {
            console.log("%s: %s", i18n.__("Error Registry 001"), err);
            return reject(err);
          });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Registry.findFiles = (id, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate({ id: id }, Registry.prototype.calls.findFiles, req, res)
      .then(() => {
        var sql =
          " SELECT f.`id`, f.`name`, f.`type`, f.`size`, f.`checksum` FROM ?? f LEFT JOIN ?? b ON f.`id` = b.`id-file` WHERE b.`id-registry` = ? ";
        var values = [
          Files.prototype.table,
          Registry.prototype.table_files,
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

Registry.list = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "    SELECT r.`id`, r.`number`, r.`type`, r.`subtype`, r.`date`, " +
      "           DATE_FORMAT(r.`date`, '%d/%m/%Y %H:%i:%s') dateFormat, " +
      "           r.`title`, r.`content`, " +
      "           r.`origin`, torigin.`name` originThirdpartyName, dorigin.`name` originDepartmentName, " +
      "           r.`destiny`, tdestiny.`name` destinyThirdpartyName, ddestiny.`name` destinyDepartmentName, " +
      "           r.`channel`, r.`tag`, r.`state`, COUNT(DISTINCT(rfiles.`id-file`)) numfiles " +
      "      FROM ?? r " +
      " LEFT JOIN thirdparties torigin ON r.`origin` = torigin.`id` " +
      " LEFT JOIN thirdparties tdestiny ON r.`destiny` = tdestiny.`id` " +
      " LEFT JOIN departments dorigin ON r.`origin` = dorigin.`id` " +
      " LEFT JOIN departments ddestiny ON r.`destiny` = ddestiny.`id` " +
      " LEFT JOIN `registry-files` rfiles ON r.`id` = rfiles.`id-registry` " +
      "  GROUP BY r.`id` " +
      "  ORDER BY r.`id` DESC ";
    var values = [Registry.prototype.table];
    db.query(sql, values)
      .then(rows => {
        return resolve(rows);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

Registry.scroll = (after, count, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate(
      { after: after, count: count },
      Registry.prototype.calls.scroll,
      req,
      res
    )
      .then(() => {
        var sql =
          "    SELECT r.`id`, r.`number`, r.`type`, r.`subtype`, r.`date`, " +
          "           DATE_FORMAT(r.`date`, '%d/%m/%Y %H:%i:%s') dateFormat, " +
          "           r.`title`, r.`content`, " +
          "           r.`origin`, torigin.`name` originThirdpartyName, dorigin.`name` originDepartmentName, " +
          "           r.`destiny`, tdestiny.`name` destinyThirdpartyName, ddestiny.`name` destinyDepartmentName, " +
          "           r.`channel`, r.`tag`, r.`state`, COUNT(DISTINCT(rfiles.`id-file`)) numfiles " +
          "      FROM ?? r " +
          " LEFT JOIN thirdparties torigin ON r.`origin` = torigin.`id` " +
          " LEFT JOIN thirdparties tdestiny ON r.`destiny` = tdestiny.`id` " +
          " LEFT JOIN departments dorigin ON r.`origin` = dorigin.`id` " +
          " LEFT JOIN departments ddestiny ON r.`destiny` = ddestiny.`id` " +
          " LEFT JOIN `registry-files` rfiles ON r.`id` = rfiles.`id-registry` " +
          "  GROUP BY r.`id` " +
          "  ORDER BY r.`id` DESC " +
          "     LIMIT ? OFFSET ?";
        var values = [
          Registry.prototype.table,
          parseInt(after),
          parseInt(count)
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

Registry.update = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate(data, Registry.prototype.calls.update, req, res)
      .then(() => {
        var sql =
          " UPDATE ?? SET `title` = ?, `content` = ?, `channel` = ?, `tag` = ?, `state` = ? WHERE id = ? ";
        var values = [
          Registry.prototype.table,
          data.title,
          data.content,
          data.channel,
          data.tag,
          data.state,
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

Registry.updateFiles = (data, req, res) => {
  return new Promise((resolve, reject) => {
    Registry.validate(data, Registry.prototype.calls.updateFiles, req, res)
      .then(() => {
        Registry.findFiles(data.id, req, res)
          .then(rows => {
            rows.forEach(file => {
              Files.delete(file.id, req, res).catch(err => {
                return reject(err);
              });
            });
            var sql = " DELETE FROM ?? WHERE `id-registry` = ? ";
            var values = [Registry.prototype.table_files, data.id];
            db.query(sql, values)
              .then(result => {
                var errors = [];
                data.files.forEach(file => {
                  fs.readFile(
                    config.UPLOAD_DIR +
                      data.id +
                      "/" +
                      file.path.replace("tmp/upload/", ""),
                    function(err, content) {
                      var shasum = crypto.createHash("sha1");
                      shasum.update(content);
                      file.checksum = shasum.digest("hex");
                      file.content = content;
                      Files.create(file, req, res)
                        .then(row => {
                          var sql =
                            " INSERT INTO ?? (`id-registry`, `id-file`) VALUES (?, ?) ";
                          var values = [
                            Registry.prototype.table_files,
                            data.id,
                            row.insertId
                          ];
                          db.query(sql, values)
                            .then(result => {
                              fs.unlink(
                                config.UPLOAD_DIR +
                                  data.id +
                                  "/" +
                                  file.path.replace("tmp/upload/", ""),
                                (err, result) => {
                                  if (err) {
                                    errors.push(err);
                                  } else {
                                    fs.rmdir(
                                      config.UPLOAD_DIR + data.id + "/",
                                      (err, result) => {
                                        if (err) {
                                          errors.push(err);
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            })
                            .catch(err => {
                              errors.push(err);
                            });
                        })
                        .catch(err => {
                          errors.push(err);
                        });
                    }
                  );
                });
                if (errors.length > 0) {
                  var err = "";
                  errors.forEach(error => {
                    err += error.data.error.error + "\n\r";
                  });
                  return reject({ err: { data: { error: { error: err } } } });
                }
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

Registry.validate = (data, call, req, res) => {
  return new Promise((resolve, reject) => {
    if (!validator.isJSON(JSON.stringify(data) + "")) {
      return reject(new Error(lang.message("Error Registry 006", req, res)));
    } else {
      switch (call) {
        case Registry.prototype.calls.create:
          error = false;
          if (
            !data.type ||
            !validator.isLength(data.type + "", { min: 1, max: 1 })
          ) {
            console.log(i18n.__("Error Registry 007"));
            error = true;
          }
          if (
            !data.subtype ||
            !validator.isLength(data.subtype + "", { min: 1, max: 1 })
          ) {
            console.log(i18n.__("Error Registry 008"));
            error = true;
          }
          if (
            !data.title ||
            !validator.isLength(data.title + "", { min: 10, max: 255 })
          ) {
            console.log(i18n.__("Error Registry 009"));
            error = true;
          }
          if (
            !data.content ||
            !validator.isLength(data.content + "", { min: 10, max: 2000 })
          ) {
            console.log(i18n.__("Error Registry 010"));
            error = true;
          }
          if (!data.origin || !validator.isInt(data.origin + "")) {
            console.log(i18n.__("Error Registry 011"));
            error = true;
          }
          if (!data.destiny || !validator.isInt(data.destiny + "")) {
            console.log(i18n.__("Error Registry 012"));
            error = true;
          }
          if (data.channel && !validator.isInt(data.channel + "")) {
            console.log(i18n.__("Error Registry 013"));
            error = true;
          }
          if (data.tag && !validator.isInt(data.tag + "")) {
            console.log(i18n.__("Error Registry 014"));
            error = true;
          }
          if (
            !data.state ||
            !validator.isLength(data.state + "", { min: 1, max: 1 })
          ) {
            console.log(i18n.__("Error Registry 015"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Registry 016", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Registry.prototype.calls.findById:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Registry 017"));
            return reject(
              new Error(lang.message("Error Registry 018", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Registry.prototype.calls.findFiles:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Registry 017"));
            return reject(
              new Error(lang.message("Error Registry 018", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Registry.prototype.calls.scroll:
          error = false;
          if (!validator.isInt(data.after + "")) {
            console.log(i18n.__("Error Registry 017"));
            error = true;
          }
          if (!validator.isInt(data.count + "")) {
            console.log(i18n.__("Error Registry 017"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Registry 018", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Registry.prototype.calls.update:
          error = false;
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Registry 019"));
            error = true;
          }
          if (
            !data.title ||
            !validator.isLength(data.title + "", { min: 10, max: 255 })
          ) {
            console.log(i18n.__("Error Registry 020"));
            error = true;
          }
          if (
            !data.content ||
            !validator.isLength(data.content + "", { min: 10, max: 2000 })
          ) {
            console.log(i18n.__("Error Registry 021"));
            error = true;
          }
          if (data.channel && !validator.isInt(data.channel + "")) {
            console.log(i18n.__("Error Registry 022"));
            error = true;
          }
          if (data.tag && !validator.isInt(data.tag + "")) {
            console.log(i18n.__("Error Registry 023"));
            error = true;
          }
          if (
            !data.state ||
            !validator.isLength(data.state + "", { min: 1, max: 1 })
          ) {
            console.log(i18n.__("Error Registry 024"));
            error = true;
          }
          if (error) {
            return reject(
              new Error(lang.message("Error Registry 025", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        case Registry.prototype.calls.updateFiles:
          if (!validator.isInt(data.id + "")) {
            console.log(i18n.__("Error Registry 017"));
            return reject(
              new Error(lang.message("Error Registry 018", req, res))
            );
          } else {
            return resolve(true);
          }
          break;
        default:
          console.log(i18n.__("Error Registry 026"));
          return reject(
            new Error(lang.message("Error Registry 026", req, res))
          );
      }
    }
  });
};

module.exports = Registry;
