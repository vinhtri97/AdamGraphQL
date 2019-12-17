import Team from "../schema/Team.schema";
// import TeamDto from "../dto/Team.dto";
import { updateDocument } from "../../../MongooseFunctions";
import { CreateTeamInput, UpdateTeamInput } from "../dto/classes/index";
export class TeamMutationService {
    async createTeam(input: CreateTeamInput): Promise<boolean | Error> {
        await Team.create(input);
        return true;
    }

    async updateTeam(input: UpdateTeamInput): Promise<boolean | Error> {
        return await updateDocument(Team, input);
    }
}
