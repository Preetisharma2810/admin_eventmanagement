const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    rollno : {
        type : String,
        required : true
    },
    participantedIn: 
        [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'eventSchema' }]
});
const userSchema = mongoose.model('userSchema',user);
module.exports = userSchema;
