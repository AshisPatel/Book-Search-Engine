// import the gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        title: String
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
    }
    
    input BookInfo {
       title: String
       bookId: String
       authors: [String]
       description: String
       image: String
       link: String
     }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User 
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: BookInfo!): User
        deleteBook(bookId: String!): User
        addWord(word: String!): User
    }
`;

// title: String!, bookId: String!, authors: [String], description: String!, image: String, link: String
module.exports = typeDefs;