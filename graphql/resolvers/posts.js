const Post = require('../../models/Post');

module.exports = {
    Query : {
        async getPosts() {
            try {
                const posts = await Post.find(); // Fetches all posts
                return posts; // Returns the posts found by the const variable above
            } catch(err) {
                throw new Error(err);
            }
        }
    }
}