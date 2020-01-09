import { Field, ObjectType } from 'type-graphql';

import PlayerDto from '../../../Player/dto/Player.dto';

// import { CreateUserInput } from "../../../Generic/dto/classes/index";
// import { ChatObj, SpectacleObj } from "./types/index";

@ObjectType()
class GetSpectacles {
    @Field(() => [PlayerDto])
    Mom: PlayerDto[];

    @Field(() => [PlayerDto])
    Dad: PlayerDto[];

    @Field(() => [PlayerDto])
    Guardian: PlayerDto[];

    @Field(() => [PlayerDto])
    Spectator: PlayerDto[];
}

@ObjectType()
export class GetSpectaclesDto {
    @Field(() => [PlayerDto])
    pending: PlayerDto[];

    @Field(() => GetSpectacles)
    accepted: GetSpectacles;
}
