
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { User } = require('./models/user');
var { mongoose } = require('./db/mongoose');

var { authenticate } = require('./middleware/authenticate');


var app = express();

const port = process.env.PORT;

app.use((request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(bodyParser.json());

app.post('/add/user', (req, res) => {
     var user = new User(req.body);
      user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        res.header('x-auth', token).send(user);
      }).catch((e) => {
        res.status(400).send(e);
      })
    });

app.listen(port, () => {
    console.log(`Started up at port ${port}`); console.log(`Started up at port ${port}`);
});
module.exports = { app };