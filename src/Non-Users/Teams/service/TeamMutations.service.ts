import Team from "../schema/Team.schema";
// import TeamDto from "../dto/Team.dto";
import { CreateTeamInput } from "./../dto/classes/index";
export class TeamMutationService {
    async createTeam(input: CreateTeamInput): Promise<boolean | Error> {
        await Team.create(input);
        return true;
    }
}
