import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("CreateCoachSchoolInfoInput")
export class CoachSchoolInfo {
    @Field({ nullable: true })
    school_district: string;

    @Field({ nullable: true })
    school: string;

    @Field({ nullable: true })
    school_type: string;
}

@InputType("CoachSchoolInfoInput")
export class CoachSchoolInfoInput implements CoachSchoolInfo {
    @Field({ nullable: true })
    school_district: string;

    @Field({ nullable: true })
    school: string;

    @Field({ nullable: true })
    school_type: string;
}
