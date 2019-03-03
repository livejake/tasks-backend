import { GraphQLNonNull, GraphQLString } from 'graphql';
import {UserInputType} from '../types';
import  {User} from '../../database/model';

const createUser = {
    type: UserInputType,
    args: { name: { type: new GraphQLNonNull(GraphQLString) } },
    async resolve(parentValue, args) {
        return User.create({ name: args.name, points: 0 }, function (err, users) {
            if (err) return console.error(err);
            return users
        })
    }
}

export default createUser