import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { UserIdResolver, UserResolver, IntervalIdResolver, IntervalsResolver, TasksResolver, ActivityLogResolver } from './resolvers'
import { createUser, createTask } from './mutations'

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
  
  const schema = new GraphQLSchema({ query: Query, mutation: Mutation })
  
  export default schema