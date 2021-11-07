const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./config/connection');
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
    // explain this
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
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
