const { model, Schema } = require('mongoose'); // Taking model and Schema from mongoose to be able to use them within this file

// Defining the User Schema to allow users to register
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    first_name: String,
    last_name: String,
    course: String,
    createdAt: String,
});

// Exporting the User model and User Schema to be able to use it in other files
module.exports = model('User', userSchema);