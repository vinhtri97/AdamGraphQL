import Spectator from "../schema/Spectator.schema";
import SpectatorDto from "../dto/Spectator.dto";
// import PlayerDto from "./../../Player/dto/Player.dto";
import {
    getNestedSpectatorObjects,
    getNestedObjects
} from "../../../Functions";
import { GetSpectaclesDto } from "../dto/classes/index";
import ChatDto from "../../../Non-Users/Chat/dto/Chat.dto";
export class SpectatorQueryService {
    async getSpectators(): Promise<Array<SpectatorDto>> {
        return await Spectator.find({}).lean();
    }

    async getSpectatorByID(id: string): Promise<SpectatorDto> {
        return await Spectator.findById(id).lean();
    }

    async getSpectacles(id: string): Promise<GetSpectaclesDto> {
        const obj = await getNestedSpectatorObjects(
            Spectator,
            id,
            "players",
            "spectacles"
        );
        const { pending, ...rest } = obj;
        const returnObj = {
            pending,
            accepted: { ...rest }
        };
        return returnObj;
    }

    async getChats(id: string): Promise<ChatDto[]> {
        const res = await getNestedObjects(
            Spectator,
            id,
            "chats",
            "chats",
            "chat_id"
        );
        console.log(res);
        return res;
    }
}
