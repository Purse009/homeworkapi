const isAuth = require('../utils/isAuth');

module.exports = {
  isAdmin: async (req, res, next) => {
    const role = await isAuth(req);
    console.log("zzzzz",role);
    if (role !== 'admin') {
      const error = new Error('Not Admin role.');
      error.statusCode = 401;
      throw error;
    }
    next();
  },
  isSale: async (req, res, next) => {
    const role = await isAuth(req);
    if (role !== 'sale') {
      const error = new Error('Not Sale role.');
      error.statusCode = 401;
      throw error;
    }
    next();
  },
};
