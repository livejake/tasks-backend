import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose'
import schema from './gql'

mongoose.connect(`mongodb://${process.env.DB_SERVER}/test`);

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(process.env.SERVER_PORT, process.env.SERVER, function () {
  console.log(`Listening to port:  ${process.env.SERVER_PORT}`);
});
