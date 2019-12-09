import { Mutation, Resolver, Args } from "type-graphql";
// import TeamDto from "../dto/Team.dto";
// import Team from "../schema/Team.schema";
import { TeamMutationService } from "./../service/index";
import { CreateTeamInput } from "./../dto/classes/index";
@Resolver()
export class TeamMutationResolver {
    teamMutationService: TeamMutationService;
    constructor() {
        this.teamMutationService = new TeamMutationService();
    }

    @Mutation(() => Boolean)
    async createTeam(@Args() input: CreateTeamInput): Promise<boolean | Error> {
        return await this.teamMutationService.createTeam(input);
    }
}
