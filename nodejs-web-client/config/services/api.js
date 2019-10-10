let config = require("../config");
let axios = require("axios");
let i18n = require("i18n");

let Api = function() {};

Api.delete = (url, params, req, res) => {
  var headers = { authorization: req._passport.session.user.token };
  var deleteParams = params ? params : {};
  var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
  deleteParams.locale = locale;
  axios
    .delete(config.API_HOST + url, {
      headers: headers,
      params: deleteParams
    })
    .then(data => {
      res.status(200).json(data.data);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

Api.get = (url, params, req, res) => {
  var headers = { authorization: req._passport.session.user.token };
  var getParams = params ? params : {};
  getParams.locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
  axios
    .get(config.API_HOST + url, { headers: headers, params: getParams })
    .then(result => {
      res.status(200).json(result.data);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

Api.post = (url, data, req, res) => {
  var headers = { authorization: req._passport.session.user.token };
  var postData = { data: data };
  var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
  postData.locale = locale;
  axios
    .post(config.API_HOST + url, { data: postData }, { headers: headers })
    .then(result => {
      res.status(200).json(result.data);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

Api.put = (url, data, req, res) => {
  var headers = { authorization: req._passport.session.user.token };
  var putData = { data: data };
  var locale = req.cookies.lang ? req.cookies.lang : i18n.getLocale();
  putData.locale = locale;
  axios
    .put(config.API_HOST + url, { data: putData }, { headers: headers })
    .then(result => {
      res.status(200).json(result.data);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

module.exports = Api;
