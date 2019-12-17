import Spectator from "../schema/Spectator.schema";
import SpectatorDto from "../dto/Spectator.dto";
import PlayerDto from "./../../Player/dto/Player.dto";
import { getNestedObjects } from "../../../Functions";
import ChatDto from "../../../Non-Users/Chat/dto/Chat.dto";
export class SpectatorQueryService {
    async getSpectators(): Promise<Array<SpectatorDto>> {
        return await Spectator.find({}).lean();
    }

    async getSpectatorByID(id: string): Promise<SpectatorDto> {
        return await Spectator.findById(id).lean();
    }

    async getSpectacles(id: string): Promise<PlayerDto[]> {
        const obj = await getNestedObjects(
            Spectator,
            id,
            "players",
            "spectacles"
        );
        return obj;
    }

    async getChats(id: string): Promise<ChatDto[]> {
        const obj = await getNestedObjects(
            Spectator,
            id,
            "chats",
            "chats",
            "chat_id"
        );

        return obj;
    }
}
