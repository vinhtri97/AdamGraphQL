import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("CoachSchoolInfoInput")
export class CoachSchoolInfo {
    @Field()
    school_district: string;

    @Field()
    school: string;

    @Field()
    school_type: string;
}
