import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserIdResolver, UserResolver, IntervalIdResolver, IntervalsResolver, TasksResolver, ActivityLogResolver } from './gql/resolvers'
import { createUser, createTask } from './gql/mutations'
import mongoose from 'mongoose'

mongoose.connect(`mongodb://${process.env.DB_SERVER}/test`);

const app = express();

const Query = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    users: UserResolver,
    intervals: IntervalsResolver,
    interval: IntervalIdResolver,
    tasks: TasksResolver,
    user: UserIdResolver,
    activityLog: ActivityLogResolver,
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: createUser,
    createTask: createTask
  }
})

let schema = new GraphQLSchema({ query: Query, mutation: Mutation })

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(process.env.SERVER_PORT, process.env.SERVER, function () {
  console.log(`Listening to port:  ${process.env.SERVER_PORT}`);
});
