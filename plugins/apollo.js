import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export default ({ app }) => {
  const apolloClient = new ApolloClient({
    uri: "YOUR_GRAPHQL_ENDPOINT", // Replace with your GraphQL endpoint
    fetch,
  });

  app.apolloProvider = require("vue-apollo").default.apolloProvider(apolloClient);
};
