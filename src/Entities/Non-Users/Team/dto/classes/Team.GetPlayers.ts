import { ObjectType, Field } from "type-graphql";
import PlayerDto from "../../../../Users/Player/dto/Player.dto";

@ObjectType()
export class GetPlayersDto {
    @Field(() => [PlayerDto])
    pending: PlayerDto[];

    @Field(() => [PlayerDto])
    accepted: PlayerDto[];
}
