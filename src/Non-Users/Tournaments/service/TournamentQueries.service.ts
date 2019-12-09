import Tournament from "../schema/Tournament.schema";
import TournamentDto from "../dto/Tournament.dto";
export class TournamentQueryService {
    async getTournaments(): Promise<Array<TournamentDto>> {
        return await Tournament.find({}).lean();
    }
}
