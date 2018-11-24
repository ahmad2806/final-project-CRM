require('./../config/config')

const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const {wipeUsers, users} = require('./seed/seed');
const { User } = require('./../models/user')
const { app } = require('./../server');	
beforeEach(wipeUsers)

describe('POST /add/user', () => {
    var username = 'ahmadhashem@gmail.com';
    var password = '12345679abc';
    it('should create a user', (done) => {
        request(app)
            .post('/add/user')
            .send({ username, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.username).toBe(username);
            })
            .end((err) => {
                if (err) {
                    return done(err)
                }
                User.findOne({ username }).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                });
            });
    });
     it('should return a validation error if request invalid', (done) => {
        request(app)
            .post('/add/user')
            .send({
                username: 'Ahmad Hashem',
                password: '123'
            })
            .expect(400)
            .end(done);
    });
     it('should not create user if username in use', (done) => {
        var userInUse = users[0];
         request(app)
            .post('/add/user')
            .send({userInUse})
            .expect(400)
            .end(done);
    });
 }); 