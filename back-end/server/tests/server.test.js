require('./../config/config')

const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { wipeUsers, users } = require('./seed/seed');
const { User } = require('./../models/user')
const { app } = require('./../server');
beforeEach(wipeUsers)

describe('POST /user', () => {
    var username = 'ahmadhashem@gmail.com';
    var password = '12345679abc';
    it('should create a user', (done) => {
        request(app)
            .post('/user')
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
                    expect(user.password).toBe(password);
                    done();
                });
            });
    });
    it('should return a validation error if request invalid', (done) => {
        request(app)
            .post('/user')
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
            .post('/user')
            .send({ userInUse })
            .expect(400)
            .end(done);
    });
});


describe('GET /allUsers', () => {
    it('should get all the users in the DB', (done) => {
        request(app)
            .get('/allUsers')
            .expect(200)
            .expect((res) => {
                expect(res.body.users.length).toBe(2)
            })
            .end(done);
    });
});


describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                username: users[0].username,
                password: users[0].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[0]._id).then((user) => {
                    expect(user.toObject().tokens[1]).toMatchObject({//insted of toInclude ... should pass an object to it
                        access: 'auth',
                        token: res.headers['x-auth']
                    })
                    done();
                }, (e) => done(e));
            });
    });
    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                username: users[1].username,
                password: '123456pass'
            })
            .expect(404)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1)
                    done();
                })
            }, (e) => done(e));
    });
});

describe('PATCH /user', () => {
    it('should update user', (done) => {
        request(app)
            .patch('/user')
            .send({
                username: users[0].username,
                password: 'ahmadhashem',
                phone: '0123456789'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.user.password).toBe('ahmadhashem');
                expect(res.body.user.phone).toBe('0123456789');
            })
            .end(done);


        describe('DELETE /user', () => {
            it('should delete a user', (done) => {
                userId = users[0]._id;
                request(app)
                    .post('/delete/user')
                    .send(users[0])
                    .expect(200)
                    .expect((res) => {
                        expect(res.body.user.username).toBe(users[0].username);
                        expect(res.body.user.name).toBe(users[0].name);
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        User.findById(userId).then((user) => {
                            expect(user).toBeFalsy();
                            done();
                        }, (e) => done(e));
                    });
            });
            it('should not delete unExisted user and return 404', (done) => {
                request(app)
                    .post('/delete/user')
                    .send({ username: 'notThere' })
                    .expect(404)
                    .end(done)
            })
        });
    });
});