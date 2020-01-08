import { getObjects } from '../../../../Functions';
import TournamentDto from '../../../Non-Users/Tournament/dto/Tournament.dto';
import DirectorDto from '../dto/Director.dto';
import Director from '../schema/Director.schema';

export class DirectorQueryService {
    async getDirectors(): Promise<Array<DirectorDto>> {
        return await Director.find({}).lean();
    }

    async getDirectorByID(directorID: string): Promise<DirectorDto> {
        return await Director.findById(directorID).lean();
    }

    async getTournaments(directorID: string): Promise<Array<TournamentDto>> {
        return await getObjects(Director, directorID, 'tournaments', 'tournaments');
    }
}
