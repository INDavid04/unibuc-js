import * as graphql from 'graphql';
import userInputType from '../types/userInputType.js';
import {createEntity} from '../../fakeDb.js';

const createUserMutationResolver = (_, { user }) => {
    if(!user) {
        throw new graphql.GraphQLError("User input is required!")
    }
    createEntity('users', { ...user })
    return true
}

const createUserMutation = {
    type: graphql.GraphQLBoolean,
    args: {
        user: { type: new graphql.GraphQLNonNull(userInputType) }
    },
    resolve: createUserMutationResolver
};

export default createUserMutation;