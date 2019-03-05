import { GraphQLNonNull,GraphQLID } from 'graphql';
import {UserType} from '../types';
import  {User } from '../../database/model';

const UserIdResolver = {
    type: UserType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parentValue, args) {
        return User.findById(args.id, function (err, user) {
            if (err) return console.error(err);
            return user
        })
    }
}

export default UserIdResolver