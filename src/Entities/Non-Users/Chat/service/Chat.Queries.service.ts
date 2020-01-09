/* eslint-disable @typescript-eslint/no-explicit-any */
import Coach from '../../../Users/Coach/schema/Coach.schema';
import Director from '../../../Users/Director/schema/Director.schema';
import Player from '../../../Users/Player/schema/Player.schema';
import Spectator from '../../../Users/Spectator/schema/Spectator.schema';
import ChatDto from '../dto/Chat.dto';
import { GetUsersDto } from '../dto/classes';
import Chat from '../schema/Chat.schema';

export class ChatQueryService {
    async getChats(): Promise<Array<ChatDto>> {
        return await Chat.find({}).lean();
    }

    async getUsers(id: string): Promise<GetUsersDto | Error> {
        const myReturnObj = {
            coaches: new Array<any>(),
            players: new Array<any>(),
            spectators: new Array<any>(),
            directors: new Array<any>(),
        };
        const foundChat: any = await Chat.findById(id).limit(1);
        if (!foundChat) throw new Error('Invalid Chat ID');
        // TODO change to find({_id: { $in: }})
        await Promise.all(
            foundChat.users.map(async ({ id: userID, type }: { [key: string]: any }) => {
                let foundUser: any = false;
                if (type == 'Player') {
                    foundUser = await Player.findById(userID).limit(1);
                    if (foundUser) myReturnObj.players.push(foundUser);
                } else if (type == 'Coach') {
                    foundUser = await Coach.findById(userID).limit(1);
                    if (foundUser) myReturnObj.coaches.push(foundUser);
                } else if (type == 'Director') {
                    foundUser = await Director.findById(userID).limit(1);
                    if (foundUser) myReturnObj.directors.push(foundUser);
                } else if (type == 'Spectator') {
                    foundUser = await Spectator.findById(userID).limit(1);
                    if (foundUser) myReturnObj.spectators.push(foundUser);
                }
                return true;
            })
        );
        return myReturnObj;
    }
}
