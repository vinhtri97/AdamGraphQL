import { Resolver, Mutation, Args, Arg } from "type-graphql";
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

    @Mutation(() => Boolean, {
        description: "Add a spectacle to a specific spectator"
    })
    async addSpectacle(
        @Arg("spectatorID") spectatorID: string,
        @Arg("playerID") playerID: string
    ): Promise<boolean | Error> {
        return await this.SpectatorMutationService.addSpectacle(
            spectatorID,
            playerID
        );
    }

    @Mutation(() => Boolean, { description: "This is something" })
    async removeSpectacle(
        @Arg("spectatorID") spectatorID: string,
        @Arg("playerID") playerID: string,
        @Arg("accepted", { nullable: true }) accepted: boolean
    ): Promise<boolean | Error> {
        return await this.SpectatorMutationService.removeSpectacle(
            spectatorID,
            playerID,
            // true
            accepted
        );
    }

    // @Mutation(() => String, { description: "This is something" })
    // async clear(
    //     @Arg("spectatorID") spectatorID: string,
    //     @Arg("playerID") playerID: string
    // ): Promise<string | Error> {
    //     return await this.SpectatorMutationService.clear(spectatorID, playerID);
    // }
}
