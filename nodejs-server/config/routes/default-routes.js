let fs = require("fs");
let showdown = require("showdown");

module.exports = app => {
  // Display API Home Page (README file content)
  app.get("/", (req, res) => {
    var css = fs.readFileSync("./css/style.css", "utf-8");
    var text =
      "<style>" + css + "</style>" + fs.readFileSync("./README.md", "utf-8");
    var converter = new showdown.Converter();
    var html = converter.makeHtml(text);
    res.send(html);
  });
};
