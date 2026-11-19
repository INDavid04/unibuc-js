import * as graphql from 'graphql';
import {deleteEntity, findEntity} from '../../fakeDb.js';

const deleteUserResolver = (_, { id }) => {
    const user = findEntity('users', id)
    if (!user) {
        throw new graphql.GraphQLError(`User with id ${id} was not found!`)
    }
    deleteEntity('users', id)
    return true
}

const deleteUserMutation = {
    type: graphql.GraphQLBoolean,
    args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
    },
    resolve: deleteUserResolver
};

export default deleteUserMutation;