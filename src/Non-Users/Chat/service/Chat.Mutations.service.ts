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
import Team from "../../../Non-Users/Team/schema/Team.schema";
const {
    Types: { ObjectId }
} = mongoose;
export class ChatMutationService {
    async createChat(input: CreateChatInput): Promise<boolean | Error> {
        const { users } = input;
        let createdChat = null;
        let team_id = null;
        if ("team_id" in input) {
            team_id = input.team_id;
            if (!mongoose.Types.ObjectId.isValid(team_id))
                throw new Error(`Invalid Team ID: ${team_id}`);
            const team: any = await Team.findById(team_id);
            if (!team) throw new Error(`Invalid Team ID: ${team_id}`);
            createdChat = await Chat.create(input);
            if (!team.chats.includes(createdChat._id)) {
                team.chats.push(ObjectId(createdChat._id));
                team.save();
            }
        } else {
            const myChat: any = await Chat.create(input);
            if ("users" in input) {
                const spectators = users.filter(
                    (item: { type: string }) => item.type == "Spectator"
                );
                const spectatorChatObj: { [k: string]: any } = {
                    chat_id: ObjectId(myChat._id),
                    has_muted: false
                };
                if ("team_id" in input) {
                    spectatorChatObj.team_id = team_id;
                }
                await Promise.all(
                    spectators.map(async (spectator: { id: any }) => {
                        return await Spectator.findByIdAndUpdate(spectator.id, {
                            $addToSet: { chats: spectatorChatObj }
                        });
                    })
                );
            }
        }
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
            throw new Error(
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
        } else throw new Error("Cannot find a collection with that ID.");
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
            throw new Error(
                "The user's type must be 'Player' or 'Coach' or 'Spectator' or 'Director'."
            );
        if (foundChat && foundUser) {
            foundChat.users = foundChat.users.filter(
                ({ id }: { [key: string]: any }) => id.toString() != userID
            );
            if ("chats" in foundUser) {
                foundUser.chats = foundUser.chats.filter(
                    ({ chat_id }: { [key: string]: any }) =>
                        chat_id.toString() != chatID
                );
                foundUser.save();
            }
            foundChat.save();

            return true;
        } else throw new Error("Cannot find a collection with that ID.");
    }

    async changeMutedStatus(
        chatID: string,
        muted: boolean,
        muted_type: string,
        userID: string
    ): Promise<boolean | Error> {
        const foundChat: any = await Chat.findById(chatID).limit(1);
        if (foundChat) {
            const foundIndex = foundChat.users.findIndex(
                ({ id }: { [key: string]: any }) => id.toString() == userID
            );
            if (foundIndex > -1) {
                foundChat.users[foundIndex].muted = muted;
                foundChat.users[foundIndex].muted_type = muted_type;
                foundChat.save();
            }
            return true;
        } else throw new Error("Cannot find a collection with that ID.");
    }
}
