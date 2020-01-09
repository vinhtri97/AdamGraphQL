import { Expo } from 'expo-server-sdk';

import Coach from '../../../../Entities/Users/Coach/schema/Coach.schema';
import Director from '../../../../Entities/Users/Director/schema/Director.schema';
import Player from '../../../../Entities/Users/Player/schema/Player.schema';
import Spectator from '../../../../Entities/Users/Spectator/schema/Spectator.schema';
import { PushMessage } from '../../dto/Message';
import { TokenDto } from '../../dto/Token';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function CreateToken(input: TokenDto): Promise<Array<PushMessage>> {
    let foundUsers = [];
    for (let i = 0; i < input.userTypes.length; i++) {
        const type = input.userTypes[i];
        switch (type) {
            case 'Spectator':
                foundUsers = [
                    ...foundUsers,
                    ...(await Spectator.find({ _id: { $in: input.ids } })
                        .lean()
                        .select('tokens')),
                ];
                break;
            case 'Coach':
                foundUsers = [
                    ...foundUsers,
                    ...(await Coach.find({ _id: { $in: input.ids } })
                        .lean()
                        .select('tokens')),
                ];
                break;
            case 'Director':
                foundUsers = [
                    ...foundUsers,
                    ...(await Director.find({ _id: { $in: input.ids } })
                        .lean()
                        .select('tokens')),
                ];
                break;
            case 'Player':
                foundUsers = [
                    ...foundUsers,
                    ...(await Player.find({ _id: { $in: input.ids } })
                        .lean()
                        .select(['tokens'])),
                ];
                break;
            default:
                console.log('New user type');
                throw new Error('New user type (update push notification backend');
        }
        if (foundUsers.length >= input.ids.length) break;
    }
    // eslint-disable-next-line prefer-spread
    const foundTokens = [].concat.apply(
        [],
        foundUsers.map(users => users.tokens)
    );
    return foundTokens
        .filter(token => Expo.isExpoPushToken(token))
        .map(token => {
            return {
                to: token,
                body: input.message,
                data: { ...input.data },
                title: input.title,
            };
        });
}
