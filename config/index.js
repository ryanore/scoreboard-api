// default to production,  however gruntfile can sends node_env para in for building local
var env = process.env.NODE_ENV || 'development';

var environment_setup ={
  production : {
    server : {port: process.env.PORT ||  8080, host: ''},
    db : process.env.MONGOLAB_URI || 'mongodb://172.31.23.245:27017/sb',
    secret : 'cookiemonsterlovecookies',
    public: '../dist'
  },
  testing : {
    server : {port: process.env.PORT ||  3003, host: '162.243.72.69'},
    db : process.env.MONGOLAB_URI || 'mongodb://162.243.72.69:27017/sb_test',
    secret : 'cookiemonsterlovecookies',
    public: '../dist'
  },
  development : {
    server : {port: process.env.PORT ||  3003, host: '127.0.0.1'},
    db : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/sb_dev',
    secret : 'cookiemonsterlovecookies',
    public: '../dist'
  }
};

var config = environment_setup[env];
config.version = '0.0.1';
config.env = env;
config.token_expire_minutes = 60 * 3;
config.token_expire_seconds = 60 * 60 * 3;

config.email = {}


exports = module.exports = config;
