import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        points: { type: GraphQLInt }
    }
});

export default UserType