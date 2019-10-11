let config = require("../config");
let i18n = require("i18n");

let Lang = function() {};

Lang.message = (message, req, res) => {
  let defaultLocale =
    res && res.getLocale() ? res.getLocale() : config.DEFAULT_LOCALE;
  let locale = defaultLocale;
  if (req && !req.query && !req.params && !req.cookies) {
    locale = req;
  }
  if (req && req.query && req.query.locale) {
    locale = req.query.locale;
  }
  if (req && req.params && req.params.locale) {
    locale = req.params.locale;
  }
  if (req && req.cookies && req.cookies.lang) {
    locale = req.cookies.lang;
  }
  i18n.setLocale(locale);
  let msg = i18n.__(message);
  i18n.setLocale(defaultLocale);
  return msg;
};

module.exports = Lang;
