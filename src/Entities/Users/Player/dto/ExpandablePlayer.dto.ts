import { Field, ObjectType } from 'type-graphql';

import CoachDto from '../../Coach/dto/Coach.dto';
import UserDto from '../../Generic/dto/User.dto';
import { GetSpectatorsDto, GetTeamsDto } from './classes';
import { GetVideosDto } from './classes/Player.GetVideos';
import { PlayerSchoolInfo, PlayerSportInfo, PowerScore } from './classes/types';

@ObjectType()
export default class ExpandablePlayerDto extends UserDto {
    @Field(() => [PowerScore])
    power_score: PowerScore[];

    @Field(() => GetSpectatorsDto)
    spectators: GetSpectatorsDto;

    @Field(() => GetTeamsDto)
    teams: GetTeamsDto;

    @Field(() => GetVideosDto)
    videos: GetVideosDto;

    @Field(() => [String])
    video_likes: string[];

    @Field(() => PlayerSportInfo)
    sport_info: PlayerSportInfo;

    @Field(() => [CoachDto])
    favorites: [CoachDto];

    @Field(() => PlayerSchoolInfo)
    school_info: PlayerSchoolInfo;

    // @Field(() => Statistics)
    // statistics: Statistics;
}
