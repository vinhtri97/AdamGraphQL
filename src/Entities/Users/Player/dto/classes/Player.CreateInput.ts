import { ArgsType, Field } from 'type-graphql';

import { CreateUserInput } from '../../../Generic/dto/classes';
import { PlayerSchoolInfo, PlayerSportInfo } from './types';

@ArgsType()
export class CreatePlayerInput extends CreateUserInput {
    @Field(() => PlayerSportInfo)
    sport_info: PlayerSportInfo;

    @Field(() => PlayerSchoolInfo, { nullable: true })
    school_info: PlayerSchoolInfo;
}
