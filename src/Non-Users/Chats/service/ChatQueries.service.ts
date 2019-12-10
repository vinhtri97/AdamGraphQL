import Chat from "../schema/Chat.schema";
import ChatDto from "../dto/Chat.dto";
export class ChatQueryService {
    async getChats(): Promise<Array<ChatDto>> {
        return await Chat.find({}).lean();
    }
}
