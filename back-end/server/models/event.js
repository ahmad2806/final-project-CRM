
const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var Schema = mongoose.Schema;

var EventSchema = new Schema({

    name: {
        type: String
    },
    type: {
        type: String
    },
    date: {
        type: Date
    },
    description: {
        type: String
    },
    relativeTo: [{
      
    }],
    arrived: [{

    }],
    didntArrived: [{

    }],
    status: {
        type: String
    },
}, { usePushEach: true });



var Event = mongoose.model('Event', EventSchema);

module.exports = { Event }
