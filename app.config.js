const env = process.env.ENVIRONMENT || 'dev';

const serverPort = {
  prod:80,
  dev:8080
}

const path = {
  prod:"/api",
  dev:"/"
}

exports.serverPort = serverPort[env];
exports.path = path[env];