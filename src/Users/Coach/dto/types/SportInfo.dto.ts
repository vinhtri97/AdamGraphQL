import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("CoachSportInfoInput")
export class CoachSportInfo {
    @Field()
    sport: string;

    @Field()
    coach_type: string;
}
