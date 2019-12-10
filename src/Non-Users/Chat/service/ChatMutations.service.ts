import Chat from "../schema/Chat.schema";
// import ChatDto from "../dto/Chat.dto";
import { CreateChatInput, UpdateChatInput } from "../dto/classes/index";
// import { ChatUser } from "../dto/classes/types/index";
import { updateDocument } from "../../../Functions";
// import Spectator from "";

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
}
