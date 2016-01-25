var confs = {
  production: require('./production'),
  testing: require('./testing'),
  development: require('./development')
};

var env = process.env.NODE_ENV || 'development';
console.log('Getting config for ', env);

module.exports = confs[env];
