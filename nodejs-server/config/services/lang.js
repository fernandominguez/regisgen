let config = require("../config");
let i18n = require("i18n");

let Lang = function() {};

Lang.getLocale = (req, res) => {
  var defaultLocale =
    res && res.getLocale() ? res.getLocale() : config.DEFAULT_LOCALE;
  var locale = defaultLocale;
  if (req && !req.query && !req.params) {
    locale = req;
  }
  if (req && req.query && req.query.locale) {
    locale = req.query.locale;
  }
  if (req && req.params && req.params.locale) {
    locale = req.params.locale;
  }
  return locale;
};

Lang.message = (message, req, res) => {
  i18n.setLocale(Lang.getLocale(req, res));
  var msg = i18n.__(message);
  i18n.setLocale(defaultLocale);
  return msg;
};

module.exports = Lang;
