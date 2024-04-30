const mongoose = require('mongoose');
const UserSchema = require('./userSchema')
const courseSchema = require('./couseSchema')
const adminSchema = require('./adminSchema')

mongoose.connect('mongodb+srv://shazebansari2536:Ghazal32@ghazali.ye8bn9j.mongodb.net/Udemy');

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', courseSchema);
const Admin = mongoose.model('Admin', adminSchema);


module.exports = {
    User,
    Course,
    Admin
};