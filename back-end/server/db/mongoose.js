var mongoose = require('mongoose');
// connecting to DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useMongoClient: true });

module.exports = {mongoose};
