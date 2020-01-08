/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { buildSchema } from "type-graphql";
import {
    PlayerMutationResolver,
    CoachMutationResolver
} from "../Users/Users.resolvers.index";

export const createSchema = () =>
    buildSchema({
        resolvers: [PlayerMutationResolver, CoachMutationResolver]
    });
