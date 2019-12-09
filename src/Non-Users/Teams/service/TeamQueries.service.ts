import Team from "../schema/Team.schema";
import TeamDto from "../dto/Team.dto";
export class TeamQueryService {
    async getTeams(): Promise<Array<TeamDto>> {
        return await Team.find({}).lean();
    }
}
