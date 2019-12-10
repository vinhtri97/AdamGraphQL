import { Resolver, Mutation, Args } from "type-graphql";
import { SpectatorMutationService } from "../service/index";
import Spectator from "../schema/Spectator.schema";
import {
    CreateSpectatorInput,
    UpdateSpectatorInput
} from "../dto/classes/index";

@Resolver()
export class SpectatorMutationResolver {
    SpectatorMutationService: SpectatorMutationService;
    constructor() {
        this.SpectatorMutationService = new SpectatorMutationService();
    }

    @Mutation(() => String, { description: "This is something" })
    async createSpectator(
        @Args() input: CreateSpectatorInput
    ): Promise<string> {
        const spectator = await Spectator.create(input);
        return spectator._id;
    }

    @Mutation(() => String, { description: "This is something" })
    async updateSpectator(
        @Args() input: UpdateSpectatorInput
    ): Promise<string> {
        return await this.SpectatorMutationService.updateSpectator(input);
    }
}
