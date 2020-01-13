import { Field, ObjectType } from 'type-graphql';

import CoachDto from '../../../../Users/Coach/dto/Coach.dto';
import DirectorDto from '../../../../Users/Director/dto/Director.dto';
import PlayerDto from '../../../../Users/Player/dto/Player.dto';
import SpectatorDto from '../../../../Users/Spectator/dto/Spectator.dto';

@ObjectType()
export class GetUsersDto {
    @Field(() => [CoachDto])
    coaches: Array<CoachDto>;

    @Field(() => [PlayerDto])
    players: Array<PlayerDto>;

    @Field(() => [SpectatorDto])
    spectators: Array<SpectatorDto>;

    @Field(() => [DirectorDto])
    directors: Array<DirectorDto>;
}
