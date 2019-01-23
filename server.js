import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';

// graphql schema 
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// root resolver
const root = {
  message: () => 'Hurray! The server has started',
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
