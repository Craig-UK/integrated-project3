const { AUTHENTICATION_ERROR, AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization; // Get the authorization header
    // Check if authorization header exists
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]; // Get the token
        // Check if token exists
        if(token) {
            try {
                const user = jwt.verify(token, SECRET_KEY); // Verify the token
                return user; // If token exists, return the user
            } catch(err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('Authorization header must be provided');
}
