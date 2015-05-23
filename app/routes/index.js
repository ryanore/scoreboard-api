module.exports = function(app) {
  app.use(require('./auth'));
  app.use(require('./users'));
  app.use(require('./games'));
};