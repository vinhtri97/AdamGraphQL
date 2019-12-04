import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("SchoolInfoInput")
export class SchoolInfo {
    @Field()
    grad_year: string;

    @Field()
    school_district: string;

    @Field()
    school: string;

    @Field()
    school_type: string;
}
