import { GraphQLList } from 'graphql';
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


export default IntervalsResolver