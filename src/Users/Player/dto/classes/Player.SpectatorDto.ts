import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("PlayerSpectatorDtoInput")
export class PlayerSpectatorDto {
    @Field()
    type: string;

    @Field()
    id: string;

    @Field()
    accepted: boolean;
}
