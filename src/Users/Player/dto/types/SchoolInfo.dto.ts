import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("SchoolInfoInput")
export class SchoolInfo {
    @Field({ nullable: true })
    grad_year: string;

    @Field({ nullable: true })
    school_district: string;

    @Field({ nullable: true })
    school: string;

    @Field({ nullable: true })
    school_type: string;
}
