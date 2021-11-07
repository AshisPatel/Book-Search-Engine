// import the gql tagged template function
const { gql } = require('apollo-server-express');


// Input Type
// input BookInfo {
//     title: String
//     bookId: String
//     authors: [String]
//     description: String
//     image: String
//     link: String
// }

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
        words: [String]
    }

    type Book {
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
        saveBook(title: String!, bookId: String!, authors: [String], description: String!, image: String, link: String): User
        deleteBook(bookId: String!): User
        addWord(word: String!): User
    }
`;

module.exports = typeDefs;