import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

const IntervalType = new GraphQLObjectType({
    name: 'Interval',
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
    }
});

export default IntervalType