import { Resolver, Mutation, Args, Arg } from "type-graphql";
import { CoachMutationService } from "../service/index";
import CreateCoachInput from "../inputs/createCoach.input";

@Resolver()
export class CoachMutationResolver {
    coachMutationService: CoachMutationService;
    constructor() {
        this.coachMutationService = new CoachMutationService();
    }

    @Mutation(() => String, { description: "This is something" })
    async createCoach(@Args() input: CreateCoachInput): Promise<string> {
        return await this.coachMutationService.createCoach(input);
    }

    @Mutation(() => String, { description: "This is something" })
    async updateCoach(
        @Arg("id") id: string,
        @Arg("thumbnail") thumbnail: string
    ): Promise<string> {
        return await this.coachMutationService.updateCoach(id, thumbnail);
    }

    @Mutation(() => String)
    async addFavorite(
        @Arg("playerID") playerID: string,
        @Arg("coachID") coachID: string
    ): Promise<string> {
        await this.coachMutationService.addFavorite(coachID, playerID);
        return playerID;
    }
}
