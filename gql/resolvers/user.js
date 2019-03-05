import {GraphQLList } from 'graphql';
import {UserType} from '../types';
import  {User } from '../../database/model';

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

export default UserResolver