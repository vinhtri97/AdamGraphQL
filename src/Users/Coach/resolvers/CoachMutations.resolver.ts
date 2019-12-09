import { Resolver, Mutation, Arg, Args } from "type-graphql";
import { CoachMutationService } from "../service/index";
// import CreateCoachInput from "../inputs/CreateCoach.input";
import Coach from "../schema/coach.schema";
import { CreateCoachInput, UpdateCoachInput } from "../dto/classes/index";
@Resolver()
export class CoachMutationResolver {
    coachMutationService: CoachMutationService;
    constructor() {
        this.coachMutationService = new CoachMutationService();
    }

    // @Mutation(() => String, { description: "This is something" })
    // async createCoach(@Args() input: CreateCoachInput): Promise<string> {
    //     return await this.coachMutationService.createCoach(input);
    // }

    @Mutation(() => String, { description: "This is something" })
    async createCoach(@Args() input: CreateCoachInput): Promise<string> {
        const coach = await Coach.create(input);
        return coach._id;
    }

    @Mutation(() => String, { description: "This is something" })
    async updateCoach(@Args() input: UpdateCoachInput): Promise<string> {
        return await this.coachMutationService.updateCoach(input);
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
