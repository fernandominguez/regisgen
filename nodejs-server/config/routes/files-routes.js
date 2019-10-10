let config = require("../config");
let files = require("../../models/files");
let auth = require("../middleware/auth-middleware");
let fs = require("fs");

module.exports = app => {
  app.delete("/api/file/:id", auth.authenticate, (req, res) => {
    files
      .delete(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/file/:id", auth.authenticate, (req, res) => {
    files
      .findById(req.query.id, req, res)
      .then(rows => {
        res.status(200).json(rows[0]);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/file", auth.authenticate, (req, res) => {
    files
      .create(req.body.data.data, req, res)
      .then(rows => {
        res.status(200).json(rows);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.get("/api/file-download/:file", auth.authenticate, (req, res) => {
    var fileData = JSON.parse(req.query.file);
    files
      .findContentById(fileData.id, req, res)
      .then(rows => {
        var dir = config.DOWNLOAD_DIR + fileData.noteId + "/";
        fs.mkdir(dir, (err, result) => {
          var file = dir + rows[0].checksum;
          var stream = fs.createWriteStream(file);
          stream.write(rows[0].content, (err, result) => {
            stream.end((err, result) => {
              var readStream = fs.createReadStream(file);
              res.setHeader("Content-Type", rows[0].type);
              res.setHeader("Content-Length", rows[0].size);
              readStream.pipe(res);
              readStream.on("end", () => {
                fs.unlink(file, err => {
                  if (!err) {
                    fs.rmdir(dir, err => {
                      if (err) {
                        res.status(500).send({ message: err.message });
                      }
                    });
                  } else {
                    res.status(500).send({ message: err.message });
                  }
                });
              });
            });
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  app.post("/api/file-upload", auth.authenticate, (req, res) => {
    fs.mkdir(config.UPLOAD_DIR + req.headers.id + "/", (err, result) => {
      var stream = fs.createWriteStream(
        config.UPLOAD_DIR +
          req.headers.id +
          "/" +
          req.headers.path.replace("tmp/upload/", "")
      );
      req.on("data", chunk => {
        stream.write(chunk);
      });
      req.on("end", () => {
        stream.end();
        res.status(200).json(true);
      });
    });
  });
};
