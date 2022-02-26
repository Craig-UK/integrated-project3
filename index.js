// Dependency Imports
const { ApolloServer } = require('apollo-server'); // The module that runs the server
const gql = require('graphql-tag'); // GraphQL-tag is a dependency for the apollo-server module
const mongoose = require('mongoose'); // Object Relational Mapper used to interface with the MongoDB database

// Relative Imports
const Post = require('./models/Post'); // Post model
const { MONGODB } = require('./config.js'); // Required to be able to connect to the MongoDB server

// GraphQL Type Definitions
const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query {
        getPosts: [Post]
    }
`
// GraphQL Resolvers that are used with the Type Definitions
const resolvers = {
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

// Creating the server with the Type Definitions and Resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Connect to the MongoDB server
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected')
        // Running the server
        return server.listen({ port: 3000})
    }).then(res => {
        console.log(`Server running at ${res.url}`)
    })