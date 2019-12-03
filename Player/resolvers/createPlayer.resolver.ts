import { Resolver, Mutation, Args } from "type-graphql";
import CreatePlayerInput from "../inputs/createPlayer.input";
import Player from "../schema/player.schema";

@Resolver()
export default class PlayerResolver {
    @Mutation(() => String, { description: "This is somthing" })
    async createPlayer(@Args() input: CreatePlayerInput): Promise<string> {
        const { dob, name, email } = input;
        await Player.create({ dob, name, email });
        return name;
    }
}
