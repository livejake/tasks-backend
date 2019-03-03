import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import IntervalType from './Interval'
import { Interval } from '../../database/model';

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

export default TaskType