import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';
import users from './model';

// graphql schema 
const schema = buildSchema(`
  type Query {
    message: String
    user(id: Int!): User
  }

  type Mutation {
    users(id:Int, name: String, email: String): User
  }

  type User {
    id: Int
    name: String
    email: String
  }
`);

// root resolver
const root = {
  message: () => 'Hurray! The server has started',

  users: (parent, args, context, info) => {
    return users
      .create(parent)
      .then(user => {
        return user;
      })
      .catch(error => {
        return error;
      })
  },

  user: (args) => {
    return users.findById(args.id)
    .then(user => {
      return user;
    })
    .catch(error => {
      return error;
    })
  },

}

// express server with graphql endpoint
const app = express();
app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4003;
app.listen(port, () => {
  console.log(`Express graphql server started on port ${port}`);
});
