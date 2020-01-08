import { getObjects } from '../../../../Functions';
import TeamDto from '../../../Non-Users/Team/dto/Team.dto';
import PlayerDto from '../../Player/dto/Player.dto';
import CoachDto from '../dto/Coach.dto';
import Coach from '../schema/Coach.schema';

export class CoachQueryService {
    async getCoaches(): Promise<Array<CoachDto>> {
        return await Coach.find({}).lean();
    }

    async getCoachByID(id: string): Promise<CoachDto> {
        return await Coach.findById(id).lean();
    }

    async getFavorites(coachID: string): Promise<Array<PlayerDto>> {
        return await getObjects(Coach, coachID, 'players', 'favorites');
    }

    async getTeams(coachID: string): Promise<Array<TeamDto>> {
        return await getObjects(Coach, coachID, 'teams', 'teams');
    }
}
