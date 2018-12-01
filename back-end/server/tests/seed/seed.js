const { User } = require('./../../models/user');
const { Volunteer } = require('./../../models/volunteer');
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
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

/*********    volunteers    *****/
const volunteerOneID = new ObjectID();
const volunteerOneDaysID = new ObjectID();
const volunteerTwoDaysID = new ObjectID();
const volunteerTwoID = new ObjectID();
const volunteers = [{
  _id: volunteerOneID,
  name: 'ahmad',
  id: "205417744",
  address: 'beit-hanina',
  phone: '0524651749',
  telePhone: '',
  homePhone: '025859294',
  email: 'AHMADLOXIZ@gmail.com',
  volunteerType: 'cat',
  job: 'software engineering',
  avatar: '',
  myEvents: [],
  hasCar: true,
  agreeToLeft: false,
  freeDays: [
    {
      _id: volunteerOneDaysID,
      saterday: false,
      friday: false,
      thursday: true,
      wednesday: true,
      tuesday: true,
      monday: false,
      sunday: true
    }]
}, {
  _id: volunteerTwoID,
  name: 'ahmad',
  id: '123456789',
  address: 'beit-hanina',
  phone: '0524651749',
  telePhone: '',
  homePhone: '025859294',
  email: 'AHMADLOXIZ@gmail.com',
  volunteerType: 'dog',
  job: 'software engineering',
  avatar: '',
  myEvents: [],
  hasCar: true,
  agreeToLeft: false,
  freeDays: [
    {
      _id: volunteerTwoDaysID,
      saterday: false,
      friday: false,
      thursday: true,
      wednesday: true,
      tuesday: true,
      monday: false,
      sunday: true
    }
  ]
}];
const wipeVolunteers = (done) => {
  Volunteer.remove({}).then(() => {
    var volunterOne = new Volunteer(volunteers[0]).save();
    var volunterTwo = new Volunteer(volunteers[1]).save();
    return Promise.all([volunterOne, volunterTwo])
  }).then(() => done());
};


module.exports = {
  users,
  wipeUsers,
  volunteers,
  wipeVolunteers,
} 