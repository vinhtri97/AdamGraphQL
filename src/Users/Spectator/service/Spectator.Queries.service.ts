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
        obj.pending = obj.pending.filter(item => item != null);
        obj.Mom = obj.Mom.filter(item => item != null);
        obj.Dad = obj.Dad.filter(item => item != null);
        obj.Guardian = obj.Guardian.filter(item => item != null);
        obj.Spectator = obj.Spectator.filter(item => item != null);
        const returnObj = {
            pending: obj.pending,
            accepted: {
                Mom: obj.Mom,
                Dad: obj.Dad,
                Guardian: obj.Guardian,
                Spectator: obj.Spectator
            }
        };
        return returnObj;
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
