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

    @Mutation(() => Boolean, { description: "Create a new Spectator" })
    async createSpectator(
        @Args() input: CreateSpectatorInput
    ): Promise<boolean | Error> {
        await Spectator.create(input);
        return true;
    }

    @Mutation(() => Boolean, {
        description:
            "Used to update basic spectator information (likely used in EditInfo"
    })
    async updateSpectator(
        @Args() input: UpdateSpectatorInput
    ): Promise<boolean | Error> {
        return await this.SpectatorMutationService.updateSpectator(input);
    }

    @Mutation(() => Boolean, {
        description: "Add a spectacle (Player obj) to a specific spectator"
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

    // TODO Change
    @Mutation(() => Boolean, {
        description:
            "This is the same as removing a Spectator from a player (removes from both)"
    })
    async removeSpectacle(
        @Arg("spectatorID") spectatorID: string,
        @Arg("playerID") playerID: string
    ): Promise<boolean | Error> {
        return await this.SpectatorMutationService.removeSpectacle(
            spectatorID,
            playerID
        );
    }

    @Mutation(() => Boolean, {
        description:
            "This is to change the spectator's type in both the Player and Spectator Object"
    })
    async changeSpectatorType(
        @Arg("spectatorID") spectatorID: string,
        @Arg("playerID") playerID: string,
        @Arg("type") type: string
    ): Promise<boolean | Error> {
        if (
            type != "Mom" &&
            type != "Dad" &&
            type != "Spectator" &&
            type != "Guardian"
        )
            throw new Error(
                `Invalid type (${type})! Must be a type within [Mom, Dad, Guardian, Spectator]`
            );
        return await this.SpectatorMutationService.changeType(
            spectatorID,
            playerID,
            type
        );
    }

    @Mutation(() => Boolean)
    async le(
        @Arg("spectatorID") spectatorID: string,
        @Arg("playerID") playerID: string
    ): Promise<boolean | Error> {
        return await this.SpectatorMutationService.removeSpectacle(
            spectatorID,
            playerID
        );
    }
}
