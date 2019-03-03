import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema } from 'graphql';
import { Interval, Task, User, ActivityLog } from "./database/model"
import mongoose from 'mongoose'
mongoose.connect(`mongodb://${process.env.DB_SERVER}/test`);

const app = express();

const IntervalType = new GraphQLObjectType({
  name: 'Interval',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    points: { type: GraphQLInt }
  }
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: { type: GraphQLID },
    interval: {
      type: IntervalType,
      async resolve(parentValue) {
        return Interval.findById(parentValue.interval, function (err, interval) {
          if (err) return console.error(err);
          return interval
        })
      }
    },
    name: { type: GraphQLString },
    points: { type: GraphQLInt },
    description: { type: GraphQLString }
  }
})

const ActivityLogType = new GraphQLObjectType({
  name: "ActivityLog",
  fields: {
    _id: { type: GraphQLID },
    task: {
      type: TaskType,
      async resolve(parentValue) {
        return Task.findById(parentValue.task, function (err, task) {
          if (err) return console.error(err);
          return task
        })
      }
    },
    user: {
      type: UserType,
      async resolve(parentValue) {
        return User.findById(parentValue.user, function (err, user) {
          if (err) return console.error(err);
          return user
        })
      }
    },
    action: { type: GraphQLString },
    timestamp: { type: GraphQLInt }
  }
})

const Query = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      args: {},
      async resolve(parentValue, args) {
        return User.find({}, function (err, users) {
          if (err) return console.error(err);
          return users
        })
      }
    },
    intervals: {
      type: new GraphQLList(IntervalType),
      args: {},
      async resolve(parentValue, args) {
        return Interval.find({}, function (err, intervals) {
          if (err) return console.error(err);
          return intervals
        })
      }
    },
    interval: {
      type: IntervalType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, args) {
        return Interval.findById(args.id, function (err, interval) {
          if (err) return console.error(err);
          return interval
        })
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {},
      async resolve(parentValue, args) {
        return Task.find({}, function (err, tasks) {
          if (err) return console.error(err);
          return tasks
        })
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, args) {
        return User.findById(args.id, function (err, user) {
          if (err) return console.error(err);
          return user
        })
      }
    },
    activityLog: {
      type: new GraphQLList(ActivityLogType),
      args: {},
      async resolve(parentValue, args) {
        return ActivityLog.find({}, function (err, activityLogs) {
          if (err) return console.error(err);
          return activityLogs
        })
      }

    }
  }
})

const UserInput = new GraphQLObjectType({
  name: 'UserInput',
  fields: {
    name: { type: GraphQLString },
  }
});

const TaskInput = new GraphQLObjectType({
  name: 'TaskInput',
  fields: {
    interval: { type: GraphQLID, defaultValue: "daily" },
    name: { type: GraphQLString, },
    points: { type: GraphQLInt, defaultValue: 0 },
    description: { type: GraphQLString, defaultValue: "" }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserInput,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, args) {
        return User.create({ name: args.name, points: 0 }, function (err, users) {
          if (err) return console.error(err);
          return users
        })
      }
    },
    createTask: {
      type: TaskInput,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        points: { type: GraphQLInt },
        interval: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        const id = await Interval.findOne({ name: args.interval || "daily" }, { "_id": 1 }, function (err, id) {
          if (err) return console.error(err);
          return id
        })

        return Task.create({
          name: args.name,
          description: args.description || "",
          points: args.points || 5,
          interval: id
        }, function (err, task) {
          if (err) return console.error(err);
          return task
        })
      }
    }
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
