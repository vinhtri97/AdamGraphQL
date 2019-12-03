import { ObjectType, Field } from "type-graphql";

@ObjectType()
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
