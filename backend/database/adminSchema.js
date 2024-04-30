const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
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
    Courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
})

module.exports = adminSchema;