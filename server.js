import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema } from 'graphql';
import db from "./database"
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
        return db.Interval.findById(parentValue.interval, function (err, interval) {
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
        return db.Task.findById(parentValue.task, function (err, task) {
          if (err) return console.error(err);
          return task
        })
      }
    },
    user: {
      type: UserType,
      async resolve(parentValue) {
        return db.User.findById(parentValue.user, function (err, user) {
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
        return db.User.find({}, function (err, users) {
          if (err) return console.error(err);
          return users
        })
      }
    },
    intervals: {
      type: new GraphQLList(IntervalType),
      args: {},
      async resolve(parentValue, args) {
        return db.Interval.find({}, function (err, intervals) {
          if (err) return console.error(err);
          return intervals
        })
      }
    },
    interval: {
      type: IntervalType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, args) {
        return db.Interval.findById(args.id, function (err, interval) {
          if (err) return console.error(err);
          return interval
        })
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {},
      async resolve(parentValue, args) {
        return db.Task.find({}, function (err, tasks) {
          if (err) return console.error(err);
          return tasks
        })
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, args) {
        return db.User.findById(args.id, function (err, user) {
          if (err) return console.error(err);
          return user
        })
      }
    },
    activityLog: {
      type: new GraphQLList(ActivityLogType),
      args: {},
      async resolve(parentValue, args) {
        return db.ActivityLog.find({}, function (err, activityLogs) {
          if (err) return console.error(err);
          return activityLogs
        })
      }

    }
  }
})

let schema = new GraphQLSchema({ query: Query })

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(process.env.SERVER_PORT, process.env.SERVER, function () {
  console.log(`Listening to port:  ${process.env.SERVER_PORT}`);
});



var root = {
  users: () => {
    return db.User.find({}, function (err, users) {
      if (err) return console.error(err);
      return users
    });
  },
  tasks: () => {
    return db.Task.find({}, function (err, tasks) {
      if (err) return console.error(err);
      return tasks
    });
  },
  intervals: () => {
    return db.Interval.find({}, function (err, intervals) {
      if (err) return console.error(err);
      return intervals
    });
  },
  activityLogs: () => {
    return db.ActivityLog.find({}, function (err, activityLogs) {
      if (err) return console.error(err);
      return activityLogs
    })
  },
  user: (args) => {
    return db.User.findById(args.id, function (err, user) {
      if (err) return console.error(err);
      return user
    })

  }
};