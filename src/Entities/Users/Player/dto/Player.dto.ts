import { Field, ObjectType } from 'type-graphql';

import UserDto from '../../Generic/dto/User.dto';
import { PlayerSpectatorDto } from './classes';
import { PlayerSchoolInfo, PlayerSportInfo, PowerScore, Statistics } from './classes/types';
import { PlayerTeams } from './classes/types/Teams.dto';
import { PlayerVideos } from './classes/types/Videos.dto';

@ObjectType()
export default class PlayerDto extends UserDto {
    @Field(() => [PowerScore])
    power_score: PowerScore[];

    @Field(() => [PlayerSpectatorDto])
    spectators: PlayerSpectatorDto[];

    @Field(() => PlayerTeams)
    teams: PlayerTeams;

    @Field(() => PlayerVideos)
    videos: PlayerVideos;

    @Field(() => [String])
    video_likes: string[];

    @Field(() => PlayerSportInfo)
    sport_info: PlayerSportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => PlayerSchoolInfo)
    school_info: PlayerSchoolInfo;

    @Field(() => Statistics)
    statistics: Statistics;
}
