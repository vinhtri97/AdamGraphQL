import { Field, ObjectType } from 'type-graphql';

import PlayerDto from '../../../../Users/Player/dto/Player.dto';
import SpectatorDto from '../../../../Users/Spectator/dto/Spectator.dto';

@ObjectType()
class PendingOrAccepted {
    @Field(() => [PlayerDto])
    pending: PlayerDto[];

    @Field(() => [PlayerDto])
    accepted: PlayerDto[];
}

@ObjectType()
export class GetPlayersAndParentsDto {
    @Field(() => PendingOrAccepted)
    players: PendingOrAccepted;

    @Field(() => [SpectatorDto])
    parents: SpectatorDto[];
}
