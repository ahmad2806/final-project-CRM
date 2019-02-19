const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
 var Schema = mongoose.Schema;
 // schema for volunteers
 var VolunteerSchema = new Schema({
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
    name: {
        type: String,
    },
    id: {
        type: String,
        unique: true
    },
    birthDay: {
        type: Date
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
    telePhone: {
        type: String,
    },
    homePhone: {
        type: String,
    },
    volunteerType: {
        type: String,
    },
    freeDays: [{
        sunday: {
            type: Boolean,
            default: false
        },
        monday: {
            type: Boolean,
            default: false
        },
        tuesday: {
            type: Boolean,
            default: false
        },
        wednesday: {
            type: Boolean,
            default: false
        },
        thursday: {
            type: Boolean,
            default: false
        },
        friday: {
            type: Boolean,
            default: false
        },
        saterday: {
            type: Boolean,
            default: false
        },
    }],
     agreeToLeft: {
        type: Boolean,
        default: false
    },
     hasCar: {
        type: Boolean,
        default: false
    },
     job: {
        type: String
    },
     address: {
        type: String
    },
     avatar: {
        type: String
    },
     myEvents: [{
    
    }],
 }, { usePushEach: true });
 var Volunteer = mongoose.model('Volunteer', VolunteerSchema);
 module.exports = { Volunteer }