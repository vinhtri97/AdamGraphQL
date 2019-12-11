/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Resolver, Mutation, Args } from "type-graphql";
import { CreatePlayerInput, UpdatePlayerInput } from "../dto/classes/index";
import Player from "../schema/Player.schema";
import { PlayerMutationService } from "../service/index";

@Resolver()
export class PlayerMutationResolver {
    playerMutationService: PlayerMutationService;
    constructor() {
        this.playerMutationService = new PlayerMutationService();
    }

    @Mutation(() => String, { description: "This is something" })
    async createPlayer(@Args() input: CreatePlayerInput): Promise<string> {
        const player = await Player.create(input);
        return player.id;
    }

    @Mutation(() => Boolean, { nullable: true })
    async updatePlayer(
        @Args() input: UpdatePlayerInput
    ): Promise<boolean | Error> {
        return await this.playerMutationService.updatePlayer(input);
    }
}
