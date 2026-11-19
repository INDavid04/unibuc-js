import * as graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import {findEntity, updateEntity} from '../../fakeDb.js';
import userType from '../types/userType.js';

const updateUserMutationResolver = (_, { id, user }) => {
    const existingUser = findEntity('users', id)
    if (!existingUser) {
        throw new graphql.GraphQLError(`User with id ${id} was not found!`)
    }
    updateEntity('users', id, user)
    return findEntity('users', id)
}

const updateUserMutation = {
    type: userType,
    args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        user: { type: new graphql.GraphQLNonNull(userInputType) }
    },
    resolve: updateUserMutationResolver
};

export default updateUserMutation;