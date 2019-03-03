import { GraphQLList } from 'graphql';
import {ActivityLogType} from '../types';
import  {ActivityLog} from '../../database/model';

const ActivityLogResolver = {
    type: new GraphQLList(ActivityLogType),
    args: {},
    async resolve(parentValue, args) {
        return ActivityLog.find({}, function (err, activityLogs) {
            if (err) return console.error(err);
            return activityLogs
        })
    }

}

export default ActivityLogResolver