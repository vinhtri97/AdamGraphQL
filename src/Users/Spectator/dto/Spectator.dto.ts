import { ObjectType, Field, ArgsType } from "type-graphql";
import UserDto from "../../Generic/dto/User.dto";
import { ChatObj, SpectacleObj } from "./classes/types/index";

@ObjectType()
@ArgsType()
export default class SpectatorDto extends UserDto {
    @Field(() => [ChatObj])
    chats: ChatObj[];

    @Field(() => [SpectacleObj])
    pending_spectacles: SpectacleObj[];

    @Field(() => [SpectacleObj])
    accepted_spectacles: SpectacleObj[];
}
