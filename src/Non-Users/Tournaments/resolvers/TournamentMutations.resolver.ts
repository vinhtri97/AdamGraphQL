import { Mutation, Resolver, Args } from "type-graphql";
// import TournamentDto from "../dto/Tournament.dto";
// import Tournament from "../schema/Tournament.schema";
import { TournamentMutationService } from "../service/index";
import {
    CreateTournamentInput,
    UpdateTournamentInput
} from "../dto/classes/index";
@Resolver()
export class TournamentMutationResolver {
    TournamentMutationService: TournamentMutationService;
    constructor() {
        this.TournamentMutationService = new TournamentMutationService();
    }

    @Mutation(() => Boolean)
    async createTournament(
        @Args() input: CreateTournamentInput
    ): Promise<boolean | Error> {
        return await this.TournamentMutationService.createTournament(input);
    }

    @Mutation(() => Boolean)
    async updateTournament(
        @Args() input: UpdateTournamentInput
    ): Promise<boolean | Error> {
        return await this.TournamentMutationService.updateTournament(input);
    }
}
