const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize the apollo server
const startApolloServer = async () => {
  // create a new Apollo server and pass in the schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // all requests go through the authMiddelware function which will either pass the request without the token if it does not exist, or attach the token data to the req.user key if it does exist
    context: authMiddleware
  });

  // start the apollo server
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// This is a wildcard route that if any route is sent to the server that is not a DB / server recognized route, it will server assets from the react front end

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
