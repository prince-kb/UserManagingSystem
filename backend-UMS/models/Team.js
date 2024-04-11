const mongoose = require('mongoose');
const {Schema} = mongoose;
const TeamSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    id : {
        type : [Number],
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
})
const User = mongoose.model('teams',TeamSchema);
module.exports = User;