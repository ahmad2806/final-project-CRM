const { User } = require('./../../models/user');
 const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb')
 const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'ahmadhashem2806@gmail.com',
  password: 'One123456abc',
  phone: '1234567890',
  username: 'ahmad',
  tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'mohammad@exmple.com',
    password: 'Two123456abc',
    phone: '1234567890',
    username: 'Hashem',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
}];
 const wipeUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
     return Promise.all([userOne,userTwo])
  }).then(() => done());
};
 module.exports = {
  users, 
  wipeUsers
} 