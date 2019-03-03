import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';

const TaskInput = new GraphQLObjectType({
    name: 'TaskInput',
    fields: {
        interval: { type: GraphQLID, defaultValue: "daily" },
        name: { type: GraphQLString, },
        points: { type: GraphQLInt, defaultValue: 0 },
        description: { type: GraphQLString, defaultValue: "" }
    }
})

export default TaskInput