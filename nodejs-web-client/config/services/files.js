let config = require("../config");
let axios = require("axios");
let crypto = require("crypto");
let fs = require("fs");
let i18n = require("i18n");

let Files = function() {};

Files.download = (req, res) => {
  var file = JSON.parse(req.params.file);
  var dir = config.DOWNLOAD_DIR + file.noteId + "/";
  let filename = dir + file.name;
  fs.mkdir(dir, (err, result) => {
    var headers = { authorization: req._passport.session.user.token };
    axios
      .get(config.API_HOST + "/api/file-download/:file", {
        headers: headers,
        params: { file: file },
        responseType: "stream"
      })
      .then(response => {
        var stream = fs.createWriteStream(filename);
        response.data.on("data", chunk => {
          stream.write(chunk);
        });
        response.data.on("end", () => {
          stream.end();
          res.status(200).json({ file: file.noteId + "/" + file.name });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });
};

Files.uploadToTmp = (req, res) => {
  var file = req.files.file;
  fs.readFile(file.path, function(err, data) {
    var shasum = crypto.createHash("sha1");
    shasum.update(data);
    file.checksum = shasum.digest("hex");
    res.status(200).send(file);
  });
};

Files.uploadToServer = (req, res) => {
  var data = JSON.parse(req.params.data);
  if (data.files) {
    var errors = [];
    data.files.forEach(file => {
      var stream = fs.createReadStream("./" + file.path);
      var headers = {
        authorization: req._passport.session.user.token,
        contentType: file.type,
        contentLength: file.size,
        path: file.path,
        id: data.id
      };
      axios
        .post(config.API_HOST + "/api/file-upload", stream, {
          headers: headers
        })
        .catch(err => {
          errors.push(err);
        });
    });
    var putData = { data: data };
    var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
    putData.locale = locale;
    axios
      .put(
        config.API_HOST + "/api/registry-files",
        { data: putData },
        { headers: { authorization: req._passport.session.user.token } }
      )
      .then(result => {
        data.files.forEach(file => {
          fs.unlink("./" + file.path, err => {
            if (err) {
              errors.push(err);
            }
          });
        });
        if (errors.length > 0) {
          var err = "";
          errors.forEach(err => {
            err += err.data.error.error + "\n\r";
          });
          res.status(500).send({ err: { data: { error: { error: err } } } });
        } else {
          res.status(200).json(result);
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
};

module.exports = Files;
