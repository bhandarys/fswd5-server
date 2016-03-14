module.exports = {
  port: function (port) {
    return process.env.C9_PROJECT ? process.env.PORT : port;
  },

  hostname: function (hostname) {
    return process.env.C9_PROJECT ? process.env.C9_HOSTNAME : hostname;
  },

  ip: function (ip) {
    return process.env.C9_PROJECT ? process.env.IP : ip;
  },

  url: function (url) {
    if (process.env.C9_PROJECT) {
      var u = require('url').parse(url);

      return u.protocol + '//' +
        process.env.IP + ':' +
        process.env.PORT +
        (u.pathname ? u.pathname: '') +
        (u.search ? u.search: '') +
        (u.hash ? u.hash: '');
    }
    else
      return url;
  }
};
