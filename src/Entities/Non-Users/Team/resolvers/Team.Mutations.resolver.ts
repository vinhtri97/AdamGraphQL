import { Mutation, Resolver, Args, Arg } from "type-graphql";
import { TeamMutationService } from "../service/index";
import { CreateTeamInput, UpdateTeamInput } from "../dto/classes/index";
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

    @Mutation(() => Boolean)
    async updateTeam(@Args() input: UpdateTeamInput): Promise<boolean | Error> {
        return await this.teamMutationService.updateTeam(input);
    }

    // TODO below here
    @Mutation(() => Boolean)
    async addPlayerToTeam(
        @Arg("teamID") teamID: string,
        @Arg("playerID") playerID: string
    ): Promise<boolean | Error> {
        return await this.teamMutationService.addPlayer(teamID, playerID);
    }

    @Mutation(() => Boolean)
    async addCoachToTeam(
        @Arg("teamID") teamID: string,
        @Arg("coachID") coachID: string
    ): Promise<boolean | Error> {
        return await this.teamMutationService.addCoach(teamID, coachID);
    }

    @Mutation(() => Boolean)
    async removePlayerFromTeam(
        @Arg("teamID") teamID: string,
        @Arg("playerID") playerID: string
    ): Promise<boolean | Error> {
        return await this.teamMutationService.removePlayer(teamID, playerID);
    }

    @Mutation(() => Boolean)
    async removeCoachFromTeam(
        @Arg("teamID") teamID: string,
        @Arg("coachID") coachID: string
    ): Promise<boolean | Error> {
        return await this.teamMutationService.removeCoach(teamID, coachID);
    }
}
