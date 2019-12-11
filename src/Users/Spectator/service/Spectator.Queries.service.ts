import Spectator from "../schema/Spectator.schema";
import SpectatorDto from "../dto/Spectator.dto";

export class SpectatorQueryService {
    async getSpectators(): Promise<Array<SpectatorDto>> {
        return await Spectator.find({}).lean();
    }

    async getSpectatorByID(id: string): Promise<SpectatorDto> {
        return await Spectator.findById(id).lean();
    }
}
