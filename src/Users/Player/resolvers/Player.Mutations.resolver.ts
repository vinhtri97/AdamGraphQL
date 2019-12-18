/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Resolver, Mutation, Args, Arg } from "type-graphql";
import { CreatePlayerInput, UpdatePlayerInput } from "../dto/classes/index";
import Player from "../schema/Player.schema";
import { PlayerMutationService } from "../service/index";

@Resolver()
export class PlayerMutationResolver {
    playerMutationService: PlayerMutationService;
    constructor() {
        this.playerMutationService = new PlayerMutationService();
    }

    @Mutation(() => Boolean, { description: "This is something" })
    async createPlayer(
        @Args() input: CreatePlayerInput
    ): Promise<boolean | Error> {
        const player = await Player.create(input);
        if (player) {
            return true;
        } else throw new Error("Cannot create player");
    }

    @Mutation(() => Boolean, { nullable: true })
    async updatePlayer(
        @Args() input: UpdatePlayerInput
    ): Promise<boolean | Error> {
        return await this.playerMutationService.updatePlayer(input);
    }

    @Mutation(() => Boolean, { description: "This is something" })
    async acceptSpectator(
        @Arg("playerID") playerID: string,
        @Arg("spectatorID") spectatorID: string,
        @Arg("type") type: string
    ): Promise<boolean | Error> {
        return await this.playerMutationService.acceptSpectator(
            playerID,
            spectatorID,
            type
        );
    }

    @Mutation(() => Boolean, {
        description:
            "This is the same as removing a Player from a Spectator (removes from both)"
    })
    async removeSpectator(
        @Arg("playerID") playerID: string,
        @Arg("spectatorID") spectatorID: string
    ): Promise<boolean | Error> {
        return await this.playerMutationService.removeSpectator(
            playerID,
            spectatorID
        );
    }

    @Mutation(() => Boolean, { description: "This is something" })
    async acceptTeamForPlayer(
        @Arg("playerID") playerID: string,
        @Arg("teamID") teamID: string
    ): Promise<boolean | Error> {
        return await this.playerMutationService.acceptTeam(playerID, teamID);
    }

    @Mutation(() => Boolean, {
        description: "This is for a player to leave a team"
    })
    async leaveTeam(
        @Arg("teamID") teamID: string,
        @Arg("playerID") playerID: string
    ): Promise<boolean | Error> {
        return await this.playerMutationService.leaveTeam(playerID, teamID);
    }
}
