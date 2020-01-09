/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserTypes } from 'src/Entities/Users/Generic/enums';
import { Arg, Mutation, Resolver } from 'type-graphql';

import Coach from '../../../Entities/Users/Coach/schema/Coach.schema';
import Director from '../../../Entities/Users/Director/schema/Director.schema';
import Player from '../../../Entities/Users/Player/schema/Player.schema';
import Spectator from '../../../Entities/Users/Spectator/schema/Spectator.schema';

@Resolver()
export class NotificationMutationResolver {
    // TODO add token
    @Mutation(() => Boolean)
    async addToken(
        @Arg('userID') userID: string,
        @Arg('userType') userType: string,
        @Arg('tokenID') tokenID: string
    ): Promise<boolean> {
        if (!Object.keys(UserTypes).includes(userType)) throw new Error('Invalid user type');
        let foundUser: any = true;
        switch (userType) {
            case 'Spectator':
                foundUser = await Spectator.findById(userID).limit(1);
                break;
            case 'Coach':
                foundUser = await Coach.findById(userID).limit(1);
                break;
            case 'Director':
                foundUser = await Director.findById(userID).limit(1);
                break;
            case 'Player':
                foundUser = await Player.findById(userID).limit(1);
                break;
            default:
                console.log('New user type');
                return false;
        }
        if (!foundUser) throw new Error('Cannot find user with that ID');
        if (!foundUser.tokens.includes(tokenID)) foundUser.tokens.push(tokenID);
        foundUser.save();
        return true;
    }

    @Mutation(() => Boolean)
    async removeToken(
        @Arg('userID') userID: string,
        @Arg('userType') userType: string,
        @Arg('tokenID') tokenID: string
    ): Promise<boolean> {
        if (!Object.keys(UserTypes).includes(userType)) throw new Error('Invalid user type');
        let foundUser: any = true;
        switch (userType) {
            case 'Spectator':
                foundUser = await Spectator.findById(userID).limit(1);
                break;
            case 'Coach':
                foundUser = await Coach.findById(userID).limit(1);
                break;
            case 'Director':
                foundUser = await Director.findById(userID).limit(1);
                break;
            case 'Player':
                foundUser = await Player.findById(userID).limit(1);
                break;
            default:
                console.log('New user type');
                return false;
        }
        if (!foundUser) throw new Error('Cannot find user with that ID');
        foundUser.tokens = foundUser.tokens.filter(token => token != tokenID);
        foundUser.save();
        return true;
    }
}
