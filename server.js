const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const mongoose = require('mongoose');
const db = require("./app")
const app = express();

const IntervalType = new graphql.GraphQLObjectType({
  name: 'Interval',
  fields: {
    _id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
  }
});

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: graphql.GraphQLID },
    name: { type: graphql.GraphQLString },
    points: { type: graphql.GraphQLInt }
  }
});

const TaskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: {
    _id: { type: graphql.GraphQLID },
    interval: {
      type: IntervalType,
      async resolve(parentValue) {
        return db.Interval.findById(parentValue.interval, function (err, interval) {
          if (err) return console.error(err);
          return interval
        })
      }

    },
    name: { type: graphql.GraphQLString },
    points: { type: graphql.GraphQLInt },
  }
})

const ActivityLogType = new graphql.GraphQLObjectType({
  name: "ActivityLog",
  fields: {
    _id: { type: graphql.GraphQLID },
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
    action: { type: graphql.GraphQLString },
    timestamp: { type: graphql.GraphQLInt }
  }
})

const Query = new graphql.GraphQLObjectType({
  name: 'QueryType',
  fields: {
    users: {
      type: new graphql.GraphQLList(UserType),
      args: {},
      async resolve(parentValue, args) {
        return db.User.find({}, function (err, users) {
          if (err) return console.error(err);
          return users
        })
      }
    },
    intervals: {
      type: new graphql.GraphQLList(IntervalType),
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
      args: { id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) } },
      async resolve(parentValue, args) {
        return db.Interval.findById(args.id, function (err, interval) {
          if (err) return console.error(err);
          return interval
        })
      }
    },
    tasks: {
      type: new graphql.GraphQLList(TaskType),
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
      args: { id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) } },
      async resolve(parentValue, args) {
        return db.User.findById(args.id, function (err, user) {
          if (err) return console.error(err);
          return user
        })
      }
    },
    activityLog: {
      type: new graphql.GraphQLList(ActivityLogType),
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

let schema = new graphql.GraphQLSchema({ query: Query })

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);



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

// var MyGraphQLSchema = graphql.buildSchema(`
//   type User {
//     _id: ID
//     name: String
//     points: Int
//   }

//   type Users {
//     user: [User]
//   }

//   type Interval{
//     _id: ID 
//     name: String
//   }

//   type activityLog{
//     _id: ID 
//     action: String
//     task: ID 
//     timestamp: String
//     user: ID  
//   }
//   type Task {
//     _id: ID 
//     name: String
//     points: Int
//     interval: ID 
//   }

//   type Query {
//     users: [User]
//     user(id: String): User
//     intervals: [Interval]
//     activityLogs: [activityLog]
//     tasks: [Task]
//   }

// `);