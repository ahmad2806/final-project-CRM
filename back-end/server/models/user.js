const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        trim: true,
        require: true,
        minlength: 6
    },
    username: {
        type: String,
        unique: true,
        minlength: 1,
        trim: true,
        required: true
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
        validate: {
            validator: (value) => {
                return /\d{10}/.test(value);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    VolPer: {
        type: Boolean,
        default: false,
    },
    DonorPer: {
        type: Boolean,
        default: false,
    },
    AdoptPer: {
        type: Boolean,
        default: false,
    },
    Freeze: {
        type: Boolean,
        default: false,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, { usePushEach: true });
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'username']);
};
//fucntion used when user sign in
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
    user.tokens.push({ access, token });
    return user.save().then(() => {
        return token;
    });
};
//so we dont hash the password more than once
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = { User }