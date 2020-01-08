import { ObjectType, Field } from "type-graphql";
// import * as mongoose from "mongoose";
@ObjectType()
export default class EntityDto {
    @Field()
    _id: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description?: string;
}
