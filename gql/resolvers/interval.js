import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import {IntervalsType} from '../types'
import { Interval } from '../../database/model';

const IntervalsResolver = {
    type: new GraphQLList(IntervalsType),
    args: {},
    async resolve(parentValue, args) {
        return Interval.find({}, function (err, intervals) {
            if (err) return console.error(err);
            return intervals
        })
    }
}

const IntervalIdResolver = {
    type: IntervalsType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parentValue, args) {
        return Interval.findById(args.id, function (err, interval) {
            if (err) return console.error(err);
            return interval
        })
    }
}

export { IntervalsResolver, IntervalIdResolver }