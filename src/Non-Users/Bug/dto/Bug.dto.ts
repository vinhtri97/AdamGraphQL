/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generic/dto/Entity.dto";

@ObjectType()
export class BugDto extends EntityDto {
    @Field({ nullable: true })
    message: string;
    // @Field()
    // message: string;

    // @Field()
    // date: string;

    // @Field()
    // category: string;

    // @Field()
    // email: string;

    // @Field()
    // first_name: string;

    // @Field()
    // last_name: string;
}
