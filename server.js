const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');
const mongoose = require('mongoose');
const db = require("./app")
const app = express();


var MyGraphQLSchema = graphql.buildSchema(`
  type User {
    _id: ID
    name: String
    points: Int
  }
  type Interval{
    _id: ID 
    name: String
  }
  
  type activityLog{
    _id: ID 
    action: String
    task: ID 
    timestamp: String
    user: ID  
  }
  type Task {
    _id: ID 
    name: String
    points: Int
    interval: ID 
  }

  type Query {
    users: [User]
    user(id: String): User
    intervals: [Interval]
    activityLogs: [activityLog]
    tasks: [Task]

  }

`);

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



app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true,
  rootValue: root
}));

app.listen(4000);
