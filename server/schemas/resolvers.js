const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, UserInputError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // query to access the user via their token 
        me: async (parent, args, context) => {
            // When the request is made to the server, it is intercepted by Apollo and ran through authentication
            // if the token was succesfully detected, then we will pass back the request as context with an additional .user key
            // The .user key contains the token in the ._id key
            if (context.user) {
                const userData = await User.findById({ _id: context.user._id })
                    .select('-__v -password')
                console.log(userData); 
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
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // check to see if passward matches encrypted password
            const correctPw = await user.isCorrectPassword(password);
            // if password is wrong, throw authentication error 
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // sign jwt to the user upon logging in
            const token = signToken(user);
            // return Auth type object => {token: ID!, user: User}
            return { user, token };
        },

        saveBook: async (parent, { book }, context) => {
            // Check to see that user is logged in
            if (context.user) {
                // Find user based on two conditions
                // 1st - _id based on context
                // 2nd - the user cannot have a book with the requrested book.bookId in their savedBooks field (handled by the $ne operator)
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id, 'savedBooks.bookId' : {$ne: book.bookId } },
                    { $push: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
                // If the user tries to add a duplicate book, then updatedUser will not exist
                // Thus, throw userInputError from Apollo-Server
                if (!updatedUser) {
                    throw new UserInputError('You cannot save duplicate books to your book list!');
                }

                return updatedUser;
            }
            // If user is not logged in, throw authentication error
            throw new AuthenticationError('You need to be logged in to save books!');
        },
        // destructure args to retrieve the bookId of the book to be deleted
        deleteBook: async (parent, { bookId }, context) => {
            // Check to see if user is logged in 
            if (context.user) {
                // Find user by the id provided in the context, and pull the book out of the savedBooks field by the bookId that is passed in through args
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            // If user is not logged in, throw authentication error
            throw new AuthenticationError('You need to be logged in to delete books!');
        }
    }
};

module.exports = resolvers;