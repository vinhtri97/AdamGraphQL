import Spectator from "../schema/Spectator.schema";
import SpectatorDto from "../dto/Spectator.dto";
import PlayerDto from "./../../Player/dto/Player.dto";
import { getObjects } from "../../../Functions";
export class SpectatorQueryService {
    async getSpectators(): Promise<Array<SpectatorDto>> {
        return await Spectator.find({}).lean();
    }

    async getSpectatorByID(id: string): Promise<SpectatorDto> {
        return await Spectator.findById(id).lean();
    }

    async getSpectacles(id: string): Promise<PlayerDto[]> {
        return await getObjects(Spectator, id, "players", "spectacles");
    }
}
