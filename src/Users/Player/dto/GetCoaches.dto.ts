import { ObjectType, Field } from "type-graphql";
import CoachDto from "../../Coach/dto/coach.dto";

@ObjectType()
export default class GetCoaches {
    @Field(() => [CoachDto])
    accepted: CoachDto[];

    @Field(() => CoachDto)
    pending: CoachDto[];
}
