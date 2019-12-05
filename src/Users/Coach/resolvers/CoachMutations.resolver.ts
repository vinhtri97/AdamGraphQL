import { Resolver, Mutation, Args, Arg } from "type-graphql";
import { CoachMutationService } from "../service/index";
import CreateCoachInput from "../inputs/createCoach.input";

@Resolver()
export class CoachMutationResolver {
    coachMutation: CoachMutationService;
    constructor() {
        this.coachMutation = new CoachMutationService();
    }

    @Mutation(() => String, { description: "This is something" })
    async createCoach(@Args() input: CreateCoachInput): Promise<string> {
        return await this.coachMutation.createCoach(input);
    }

    @Mutation(() => String, { description: "This is something" })
    async updateCoach(
        @Arg("id") id: string,
        @Arg("thumbnail") thumbnail: string
    ): Promise<string> {
        return await this.coachMutation.updateCoach(id, thumbnail);
    }
}
