const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    firstName : {
        type : String,
        required : true,
        maxLength : 20
    },
    lastName : {
        type : String,
        required : true,
        maxLength : 20
    },
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }],
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
})



module.exports = UserSchema;