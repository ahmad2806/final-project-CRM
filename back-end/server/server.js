
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { User } = require('./models/user');
var { Volunteer } = require('./models/volunteer')
var { Donor } = require('./models/donor')

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
/*******************        User        **********************/
//access when a user login .. token is generated every time he does
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['username', 'password']);
    User.findByCredentials(body.username, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }, (e) => {
        console.log(e);
        if (e === 'wrong-password') {
            res.status(404).send()
        } else {
            res.status(400).send();
        }
    });
});

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

app.get('/allUsers', (req, res) => {
    User.find({})
        .then((users) => {
            res.send({ users })
        }, (e) => {
            console.log(res);
            res.status(400).send(e);
        });
});

app.post('/edit/user', (req, res) => {
    var updateUser = req.body;
    User.findOneAndUpdate({
        username: updateUser.username
    }, { $set: updateUser }, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(400).send();
            }
            res.send({ user })
        }, (e) => res.status(400).send())
});

app.post('/delete/user', (req, res) => {
    User.findOneAndRemove({
        username: req.body.username
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }
            res.send({ user })
        }, (e) => res.status(400).send());
});

/*******************        Volunteer        **********************/
app.post('/volunteer', (req, res) => {
    var volunteerToAdd = new Volunteer(req.body);
    volunteerToAdd.save().then((volunteer) => {
        res.send(volunteer);
    }, (e) => res.status(400).send(e));
});

app.get('/volunteers', (req, res) => {
    Volunteer.find({})
        .then((volunteers) => {
            res.send({ volunteers });
        }, (e) => res.status(400).send(e));
});

app.post('/edit/volunteer', (req, res) => {
    Volunteer.findOneAndUpdate({
        _id: req.body._id
    }, { $set: req.body }, { new: true })
        .then((volunteer) => {
            if (!volunteer)
                return res.status(404).send();
            res.send({ volunteer });
        }, (e) => res.status(400).send(e));
});

app.post('/delete/volunteer', (req, res) => {
    Volunteer.findOneAndRemove({
        _id: req.body._id
    }).then((volunteer) => {
        if (!volunteer)
            return res.status(404).send();
        res.status(200).send({ volunteer })
    }, (e) => res.status(400).send());
});
/**** Donors ****/
app.get('/allDonors', (req, res) => {
    Donor.find({}).then((donors) => {
        if (!donors)
            return res.status(404).send();
        res.send(donors);
    });
});
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
module.exports = { app };