const { ApolloServer, gql } = require('apollo-server');
const { products } = require('./data');
const { v4: uuid } = require('uuid');


// Define el esquema GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define las resolvers para el esquema
const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => products.find(product => product.id === id),
  },
  Mutation: {
    createProduct: (_, { name, price }) => {
      const newProduct = { id: uuid(), name, price };
      products.push(newProduct);
      return newProduct;
    }
  }
};


// Crea una nueva instancia de ApolloServer y pásale el esquema y los resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Inicia el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor iniciado en la url ${url}`);
});
