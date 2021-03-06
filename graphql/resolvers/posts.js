const { AUTHENTICATION_ERROR, AuthenticationError } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');

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
        async getPostsbyUser(_,{username}) {
            try {
                const posts = await Post.find({username}).sort({ createdAt: -1 }); // Fetches all posts
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
            if (body.trim() === '') {
                throw new Error('Post body must not be empty')
            }
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            const pubsub = new PubSub();

            console.log(newPost);

            pubsub.publish('NEW_POST', {
                newPost: post
            });

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
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
            
            const post = await Post.findById(postId);

            if(post){
                if(post.likes.find(like => like.username === username)){
                    // if already liked by user, like is removed
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    // if not liked, like is given
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post;
            } else throw new UserInputError('Post does not exist');
        }
        
    },
};