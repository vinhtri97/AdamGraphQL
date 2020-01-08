import { getNestedSpectatorObjects, getNestedTrueFalseObjects, getObjects } from '../../../../Functions';
import CoachDto from '../../Coach/dto/Coach.dto';
import { GetSpectatorsDto, GetTeamsDto } from '../dto/classes';
import { GetVideosDto } from '../dto/classes/Player.GetVideos';
import PlayerDto from '../dto/Player.dto';
import Player from '../schema/Player.schema';

export class PlayerQueryService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }

    async getFavorites(playerID: string): Promise<Array<CoachDto>> {
        return await getObjects(Player, playerID, 'coaches', 'favorites');
    }

    async getTeams(playerID: string): Promise<GetTeamsDto> {
        return await getNestedTrueFalseObjects(Player, playerID, 'teams', 'teams');
    }

    async getVideos(playerID: string): Promise<GetVideosDto> {
        return await getNestedTrueFalseObjects(Player, playerID, 'videos', 'videos');
    }

    async getSpectators(playerID: string): Promise<GetSpectatorsDto> {
        const obj = await getNestedSpectatorObjects(Player, playerID, 'spectators', 'spectators');
        const { pending, ...rest } = obj;
        const returnObj = {
            pending,
            accepted: { ...rest },
        };
        return returnObj;
    }
}
