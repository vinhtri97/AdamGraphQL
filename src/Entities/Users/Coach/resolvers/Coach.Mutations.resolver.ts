import { Resolver, Mutation, Arg, Args } from "type-graphql";
import { CoachMutationService } from "../service/index";
import { CreateCoachInput, UpdateCoachInput } from "../dto/classes/index";
@Resolver()
export class CoachMutationResolver {
    coachMutationService: CoachMutationService;
    constructor() {
        this.coachMutationService = new CoachMutationService();
    }

    @Mutation(() => Boolean, { description: "This is something" })
    async createCoach(
        @Args() input: CreateCoachInput
    ): Promise<boolean | Error> {
        return await this.coachMutationService.createCoach(input);
    }

    @Mutation(() => Boolean, { description: "This is something" })
    async updateCoach(
        @Args() input: UpdateCoachInput
    ): Promise<boolean | Error> {
        return await this.coachMutationService.updateCoach(input);
    }

    @Mutation(() => Boolean)
    async addFavorite(
        @Arg("playerID") playerID: string,
        @Arg("coachID") coachID: string
    ): Promise<boolean | Error> {
        return await this.coachMutationService.addFavorite(coachID, playerID);
    }

    @Mutation(() => Boolean)
    async removeFavorite(
        @Arg("playerID") playerID: string,
        @Arg("coachID") coachID: string
    ): Promise<boolean | Error> {
        return await this.coachMutationService.removeFavorite(
            coachID,
            playerID
        );
    }
}
