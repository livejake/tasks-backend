
import { GraphQLNonNull, GraphQLString,GraphQLInt } from 'graphql';
import TaskInput from '../types/TaskInput';
import  {Interval, Task } from '../../database/model';

const createTask = {
    type: TaskInput,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        points: { type: GraphQLInt },
        interval: { type: GraphQLString }
    },
    async resolve(parentValue, args) {
        const id = await Interval.findOne({ name: args.interval || "daily" }, { "_id": 1 }, 
        function (err, id) {
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

export default createTask