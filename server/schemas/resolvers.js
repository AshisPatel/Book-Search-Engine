const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // query to access the user via their token 
        me: async (parent, args, context) => {
            // When the request is made to the server, it is intercepted by Apollo and ran through authentication
            // if the token was succesfully detected, then we will pass back the request as context with an additional .user key
            // The .user key contains the token in the ._id key
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')

                return userData; 
            }

            throw new AuthenticationError('Not logged in!');
        }
    },

    Mutation: {
        // mutation to add a user to the User collection
        addUser: async (parent, args) => {
            // args should contain the following object => {email, username, password}
            const user = await User.create(args);
            // attach a jwt for the created user
            const token = signToken(user);
            // returns Auth type object => {token: ID!, user: User}
            return { token, user }

        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            // if no user found by this email, throw authentication error
            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // check to see if passward matches encrypted password
            const correctPw = await user.isCorrectPassword(password);
            // if password is wrong, throw authentication error 
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // sign jwt to the user upon logging in
            const token = signToken(user);
            // return Auth type object => {token: ID!, user: User}
            return { user, token };
        },

        saveBook: async(parent, args, context) => {

        }
    }
};

module.exports = resolvers; 