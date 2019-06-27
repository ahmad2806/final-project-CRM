
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { User } = require('./models/user');
var { Volunteer } = require('./models/volunteer')
var { Donor } = require('./models/donor')
var { Event } = require('./models/event')

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
        if (e === 'wrong-password') {
            res.status(404).send()
        } else {
            res.status(400).send();
        }
    });
});
// adding new user
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
// getting all users
app.get('/allUsers', (req, res) => {
    User.find({})
        .then((users) => {
            res.send({ users })
        }, (e) => {
            res.status(400).send(e);
        });
});
//editing user 
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
// deleting user
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
// adding new volunteer
app.post('/volunteer', (req, res) => {
    var volunteerToAdd = new Volunteer(req.body);
    volunteerToAdd.save().then((volunteer) => {
        res.send(volunteer);
    }, (e) => res.status(400).send(e));
});
// get all volunteers
app.get('/volunteers', (req, res) => {
    Volunteer.find({})
        .then((volunteers) => {
            res.send({ volunteers });
        }, (e) => res.status(400).send(e));
});
// editing volunteer
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
// deleting volunteer
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
/* adding new donor */
app.post('/donor', (req, res) => {
    var donorToAdd = Donor(req.body);
    donorToAdd.save().then((donor) => {
        res.send({ donor });
    }, (e) => res.status(400).send());
});

/* editing  donor */
app.post('/edit/donor', (req, res) => {
    Donor.findOneAndUpdate({
        _id: req.body._id
    }, { $set: req.body }, { new: true }).then((donor) => {
        if (!donor) {
            return res.status(404).send(donor);
        }
        res.send({ donor });
    }, (e) => {
        res.status(400).send(e);
    })
});

/* deleting  donor */
app.post('/delete/donor', (req, res) => {
    console.log("inn delete")
    Donor.findOneAndRemove({
        _id: req.body._id
    }).then((donor) => {

        res.send({ donor })
    }, (e) => res.status(400).send());
});
app.post('/allDonors', (req, res) => {
    let my_req = req.body
    let donors_to_add = []
    my_req.forEach(function (element) {
        donors_to_add.push(Donor(element))
    });
    Donor.insertMany(donors_to_add).then((result) => {
        res.send(result);
    });
});

/************** Events ****************/
app.post('/event', (req, res) => {
    var EventToAdd = Event(req.body);
    EventToAdd.save().then((event) => {
        console.log(event)
        res.send({ event });
    }, (e) => res.status(400).send());
});

app.get('/donor/events', (req, res) => {
    Event.find({
        type: { $in: ['private-donor-Model', 'organization-donor-Model'] }
    }).then((events) => {
        if (events.length === 0) {
            res.status(404).send()
        } else {
            res.send({ events })
        }
    }, (e) => res.status(400).send());
});

app.get('/volunteer/events', (req, res) => {
    Event.find({
        type: 'volunteer-Model'
    }).then((events) => {
        if (events.length === 0) {
            res.status(404).send()
        } else {
            res.send({ events })
        }
    }, (e) => res.status(400).send());
});

app.post('/delete/event', (req, res) => {
    var deletedEvent = new Event(req.body)
    deletedEvent.type = 'deleted';
    Event.findOneAndUpdate({
        _id: req.body._id
    }, { $set: deletedEvent }, { new: true }).then((event) => {
        res.send(deletedEvent);
    }, (e) => res.status(400).send(e));

});
app.post('/volunteers', (req, res) => {
    let my_req = req.body
    
    let volunteers_to_add = []
    my_req.forEach(function (element) {
        volunteers_to_add.push(Volunteer(element))
    });
    Volunteer.insertMany(volunteers_to_add).then((result) => {
        console.log(result);
        res.send(result);
    });
});

app.get('/deleted/event', (req, res) => {
    Event.find({
        type: 'deleted'
    }).then((events) => {

        res.send({ events })

    }, (e) => res.status(400).send());
});

app.post('/edit/event', (req, res) => {
    Event.findOneAndUpdate({
        _id: req.body._id
    }, { $set: req.body }, { new: true }).then((event) => {
        if (!event) {
            return res.status(404).send();
        }
        res.send({ event });
    }, (e) => {
        res.status(400).send(e);
    })
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});
module.exports = { app };
