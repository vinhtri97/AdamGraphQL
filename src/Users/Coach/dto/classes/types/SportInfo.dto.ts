import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("CreateCoachSportInfoInput")
export class CoachSportInfo {
    @Field()
    sport: string;

    @Field()
    coach_type: string;
}

@InputType("CoachSportInfoInput")
export class CoachSportInfoInput implements CoachSportInfo {
    @Field({ nullable: true })
    sport: string;

    @Field({ nullable: true })
    coach_type: string;
}
