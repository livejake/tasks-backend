import { GraphQLObjectType, GraphQLString } from 'graphql';

const UserInput = new GraphQLObjectType({
    name: 'UserInput',
    fields: {
        name: { type: GraphQLString },
    }
});

export default UserInput