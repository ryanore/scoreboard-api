var nodemailer = require('nodemailer');

function getTransport() {
	return nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'developertestbed',
        pass: 'krysten1012'
    }
	});

}

module.exports = {
  version: '0.0.1',
  server : {port: process.env.PORT ||  8080, host: '127.0.0.1'},
  env: 'production',
  email: {
  	from: 'developertestbed@gmail.com',
  	transport: getTransport()
  },
  db : process.env.MONGO_URI || '',
  transport: getTransport(),
  whitelist: '*',
    auth: {
    secret: 'salsdfk289e39qi12i12wp12kjw0',
    expiry_minutes: (60 * 3),
    expire_seconds: (60 * 60 * 3)
  }
};
