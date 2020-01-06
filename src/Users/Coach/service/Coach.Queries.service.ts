import Coach from "../schema/Coach.schema";
import CoachDto from "../dto/Coach.dto";
import PlayerDto from "../../Player/dto/Player.dto";
import TeamDto from "../../../Non-Users/Team/dto/Team.dto";
import { getObjects } from "../../../Functions";
export class CoachQueryService {
    async getCoaches(): Promise<Array<CoachDto>> {
        return await Coach.find({}).lean();
    }

    async getCoachByID(id: string): Promise<CoachDto> {
        return await Coach.findById(id).lean();
    }

    async getFavorites(coachID: string): Promise<Array<PlayerDto>> {
        return await getObjects(Coach, coachID, "players", "favorites");
    }

    async getTeams(coachID: string): Promise<Array<TeamDto>> {
        return await getObjects(Coach, coachID, "teams", "teams");
    }
}
