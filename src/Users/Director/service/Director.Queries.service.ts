import Director from "../schema/Director.schema";
import DirectorDto from "../dto/Director.dto";
import TournamentDto from "../../../Non-Users/Tournament/dto/Tournament.dto";
import { getObjects } from "../../../Functions";
export class DirectorQueryService {
    async getDirectors(): Promise<Array<DirectorDto>> {
        return await Director.find({}).lean();
    }

    async getDirectorByID(directorID: string): Promise<DirectorDto> {
        return await Director.findById(directorID).lean();
    }

    async getTournaments(directorID: string): Promise<Array<TournamentDto>> {
        return await getObjects(
            Director,
            directorID,
            "tournaments",
            "tournaments"
        );
    }
}
