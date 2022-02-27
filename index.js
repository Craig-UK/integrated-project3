// Dependency Imports
const { ApolloServer } = require('apollo-server'); // The module that runs the server
const mongoose = require('mongoose'); // Object Relational Mapper used to interface with the MongoDB database

// Relative Imports
const typeDefs = require('./graphql/typeDefs'); // import typeDefs
const resolvers = require('./graphql/resolvers'); // import resolvers
const { MONGODB } = require('./config.js'); // Required to be able to connect to the MongoDB server

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