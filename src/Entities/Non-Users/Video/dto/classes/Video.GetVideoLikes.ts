/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ObjectType } from 'type-graphql';

import DirectorDto from '../../../..//Users/Director/dto/Director.dto';
import PlayerDto from '../../../..//Users/Player/dto/Player.dto';
import CoachDto from '../../../../Users/Coach/dto/Coach.dto';
import SpectatorDto from '../../../../Users/Spectator/dto/Spectator.dto';

@ObjectType()
export class GetVideoLikes {
    @Field(() => [PlayerDto])
    players: PlayerDto[];

    @Field(() => [SpectatorDto])
    spectators: SpectatorDto[];

    @Field(() => [DirectorDto])
    directors: PlayerDto[];

    @Field(() => [CoachDto])
    coaches: PlayerDto[];
}
