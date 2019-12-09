import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class EntityDto {
    @Field()
    name: string;

    @Field()
    description: string;
}
