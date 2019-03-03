import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import UserType from './User'
import TaskType from './Task'

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

export default ActivityLogType