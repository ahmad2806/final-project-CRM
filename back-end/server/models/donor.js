
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var Schema = mongoose.Schema;

var DonorSchema = new Schema({
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
    donateDate: {
        type: Date
    },
    name: {
        type: String,
    },
    id: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date
    },
    address: {
        type: String
    },
    phone: {
        type: String,
    },
    homePhone: {
        type: String,
    },
    donorType: {
        type: String,
    },
    amount: {
        type: Number
    },

    hisEvent: [{

    }],

    description: {
        type: String
    },


    donate: [{
      
    }],

}, { usePushEach: true });



var Donor = mongoose.model('Donor', DonorSchema);

module.exports = { Donor }
