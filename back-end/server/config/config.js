var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
  var config = require('./config.json')//to convert that file to an object
  var envConfig = config[env];//we set our env based on the env we are running on
  
  Object.keys(envConfig).forEach((key) => {//object.key get all the keys in the encConfig and foreach loop to all of them
    process.env[key] = envConfig[key];//we set the process.env 
  });
}
