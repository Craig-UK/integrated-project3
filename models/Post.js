const { model, Schema } = require('mongoose'); // Taking model and Schema from mongoose to be able to use them within this file

// Defining the Post Schema to allow users to create posts
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    // This field allows us to able to use this user field using mongoose methods
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

// Exporting the Post model and Post Schema to be able to use it in other files
module.exports = model('Post', postSchema);