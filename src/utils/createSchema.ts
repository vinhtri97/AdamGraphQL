/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { buildSchema } from 'type-graphql';

import { CoachMutationResolver, PlayerMutationResolver } from '../Entities/Users/Users.resolvers.index';

export const createSchema = () =>
    buildSchema({
        resolvers: [PlayerMutationResolver, CoachMutationResolver]
    });
