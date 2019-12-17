/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Chat from "../schema/Chat.schema";
import { CreateChatInput, UpdateChatInput } from "../dto/classes/index";
import { updateDocument } from "../../../MongooseFunctions";
import * as mongoose from "mongoose";
import Player from "../../../Users/Player/schema/Player.schema";
import Coach from "../../../Users/Coach/schema/Coach.schema";
import Spectator from "../../../Users/Spectator/schema/Spectator.schema";
import Director from "../../../Users/Director/schema/Director.schema";
const {
    Types: { ObjectId }
} = mongoose;
export class ChatMutationService {
    async createChat(input: CreateChatInput): Promise<boolean | Error> {
        // const { players, coaches, spectators, directors } = input;
        await Chat.create(input);
        // await Promise.all(spectators.map(({id:spectID}: ChatUser) => await ))
        return true;
    }

    async updateChat(input: UpdateChatInput): Promise<boolean | Error> {
        return await updateDocument(Chat, input);
    }

    async addUser(
        chatID: string,
        userType: string,
        userID: string
    ): Promise<boolean | Error> {
        const foundChat: any = await Chat.findById(chatID).limit(1);
        let foundUser: any = false;
        if (userType == "Player") {
            foundUser = await Player.findById(userID).limit(1);
        } else if (userType == "Spectator") {
            foundUser = await Spectator.findById(userID).limit(1);
        } else if (userType == "Coach") {
            foundUser = await Coach.findById(userID).limit(1);
        } else if (userType == "Director") {
            foundUser = await Director.findById(userID).limit(1);
        } else
            return new Error(
                "The user's type must be 'Player' or 'Coach' or 'Spectator' or 'Director'."
            );
        if (foundChat && foundUser) {
            const alreadyInChat = foundChat.users.some(
                ({ id }: { [key: string]: any }) => id.toString() == userID
            );
            const alreadyHasChat = foundUser.chats.some(
                ({ chat_id }: { [key: string]: any }) =>
                    chat_id.toString() == chatID
            );
            if (!alreadyInChat && !alreadyHasChat) {
                foundChat.users.push({
                    id: ObjectId(userID),
                    type: userType,
                    has_muted: false
                });
                foundUser.chats.push({
                    chat_id: ObjectId(chatID),
                    has_muted: false
                });
                foundChat.save();
                foundUser.save();
            }
            return true;
        } else return new Error("Cannot find a collection with that ID.");
    }

    async removeUser(
        chatID: string,
        userType: string,
        userID: string
    ): Promise<boolean | Error> {
        const foundChat: any = await Chat.findById(chatID).limit(1);
        let foundUser: any = false;
        if (userType == "Player") {
            foundUser = await Player.findById(userID).limit(1);
        } else if (userType == "Spectator") {
            foundUser = await Spectator.findById(userID).limit(1);
        } else if (userType == "Coach") {
            foundUser = await Coach.findById(userID).limit(1);
        } else if (userType == "Director") {
            foundUser = await Director.findById(userID).limit(1);
        } else
            return new Error(
                "The user's type must be 'Player' or 'Coach' or 'Spectator' or 'Director'."
            );
        if (foundChat && foundUser) {
            foundChat.users = foundChat.users.filter(
                ({ id }: { [key: string]: any }) => id.toString() != userID
            );
            foundChat.users = foundUser.chats.filter(
                ({ chat_id }: { [key: string]: any }) =>
                    chat_id.toString() != chatID
            );
            foundChat.save();
            foundUser.save();
            return true;
        } else return new Error("Cannot find a collection with that ID.");
    }
}
