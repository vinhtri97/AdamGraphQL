import { ArgsType, Field } from 'type-graphql';

import { UpdateUserInput } from '../../../Generic/dto/classes';
import { PlayerSchoolInfoInput, PlayerSportInfoInput } from './types';

@ArgsType()
export class UpdatePlayerInput extends UpdateUserInput {
    @Field(() => PlayerSportInfoInput, { nullable: true })
    sport_info?: PlayerSportInfoInput;

    @Field(() => PlayerSchoolInfoInput, { nullable: true })
    school_info?: PlayerSchoolInfoInput;
}
