import * as graphql from 'graphql';
import userType from '../types/userType.js';
import {findEntity} from '../../fakeDb.js';

const userQueryResolver = (_, { id }) => {
    const user = findEntity("users", id)
    if (!user) {
        throw new graphql.GraphQLError(`User with id ${id} was not found!`)
    }
    return user
}

const userQuery = {
    type: userType,
    args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
    },
    resolve: userQueryResolver
};

export default userQuery;