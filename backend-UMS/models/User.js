const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    first_name :{
        type : String,
        required: true
    },
    last_name :{
        type : String
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    },
    domain : {
        type : String
    },
    available : {
        type : Boolean,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})
const User = mongoose.model('users',UserSchema);
module.exports = User;