let config = require("../config");
let i18n = require("i18n");

let Lang = function() {};

Lang.message = (message, req, res) => {
  var defaultLocale =
    res && res.getLocale() ? res.getLocale() : config.DEFAULT_LOCALE;
  var locale = defaultLocale;
  if (req && req.query && req.query.locale) {
    locale = req.query.locale;
  }
  if (req && req.params && req.params.locale) {
    locale = req.params.locale;
  }
  i18n.setLocale(locale);
  var msg = i18n.__(message);
  i18n.setLocale(defaultLocale);
  return msg;
};

module.exports = Lang;
