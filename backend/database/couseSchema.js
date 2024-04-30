const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 200
    },
    description : {
        type : String,
        required : true,
        maxLength : 400
    },
    instructor : {
        type : String,
        required : true,
        maxLength : 20
    },
    price : {
        type : Number,
    },
    imageUrl : String
});

module.exports = courseSchema;