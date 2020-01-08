import { ArgsType, Field, ObjectType } from 'type-graphql';

import UserDto from '../../Generic/dto/User.dto';
import { ChatObj, SpectacleObj } from './classes/types';

@ObjectType()
@ArgsType()
export default class SpectatorDto extends UserDto {
    @Field(() => [ChatObj])
    chats: ChatObj[];

    @Field(() => [SpectacleObj])
    spectacles: SpectacleObj[];
}
