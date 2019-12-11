/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generic/dto/Entity.dto";

@ObjectType()
export default class FieldDto extends EntityDto {
    @Field(() => String)
    park: string;

    @Field()
    highschool_compatible: boolean;
}
