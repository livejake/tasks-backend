import { GraphQLNonNull,GraphQLID,GraphQLList } from 'graphql';
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

const UserResolver = {
    type: new GraphQLList(UserType),
    args: {},
    async resolve(parentValue, args) {
      return User.find({}, function (err, users) {
        if (err) return console.error(err);
        return users
      })
    }
  }

export { UserResolver,UserIdResolver}