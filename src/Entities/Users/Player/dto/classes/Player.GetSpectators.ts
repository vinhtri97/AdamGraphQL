import { Field, ObjectType } from 'type-graphql';

import SpectatorDto from '../../../Spectator/dto/Spectator.dto';

// import { CreateUserInput } from "../../../Generic/dto/classes/index";
// import { ChatObj, SpectacleObj } from "./types/index";

@ObjectType()
class GetSpectators {
    @Field(() => [SpectatorDto])
    Mom: SpectatorDto[];

    @Field(() => [SpectatorDto])
    Dad: SpectatorDto[];

    @Field(() => [SpectatorDto])
    Guardian: SpectatorDto[];

    @Field(() => [SpectatorDto])
    Spectator: SpectatorDto[];
}

@ObjectType()
export class GetSpectatorsDto {
    @Field(() => [SpectatorDto])
    pending: SpectatorDto[];

    @Field(() => GetSpectators)
    accepted: GetSpectators;
}
