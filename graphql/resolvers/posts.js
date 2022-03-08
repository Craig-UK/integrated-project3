const { AUTHENTICATION_ERROR, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query : {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 }); // Fetches all posts
                return posts; // Returns the posts found by the const variable above
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId); // Finds a specific post by that post's ID
                if(post) { // Ensure the post exists
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation : {
        async createPost(_, { body }, context) {
            const user = checkAuth(context); // Check that the user exists
            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if(user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};