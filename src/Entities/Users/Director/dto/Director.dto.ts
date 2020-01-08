import { ObjectType, Field, ArgsType } from "type-graphql";
import UserDto from "../../Generic/dto/User.dto";

@ObjectType()
@ArgsType()
export default class DirectorDto extends UserDto {
    @Field(() => [String])
    tournaments: string[];

    @Field()
    association: string;
}
