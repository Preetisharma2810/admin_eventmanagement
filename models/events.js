const mongoose = require('mongoose');
require('./user');
const events = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    venue : {
        type : String,
        required : true
    },
    coordinator : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
     participants: 
    [
        { type: mongoose.Schema.Types.ObjectId, 
         ref: 'userSchema' }
]
});
const eventSchema= mongoose.model('eventSchema', events);
module.exports = eventSchema;