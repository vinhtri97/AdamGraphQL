import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Academics {
    @Field()
    ACT_Score: number;

    @Field()
    SAT_Score: number;

    @Field()
    GPA: number;
}
