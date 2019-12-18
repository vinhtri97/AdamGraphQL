/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generic/dto/Entity.dto";

@ObjectType()
export default class FieldDto extends EntityDto {
    @Field(() => String)
    park: string;

    @Field()
    has_seating: boolean;

    @Field()
    is_turf: boolean;

    @Field(() => [String])
    pictures: string[];

    @Field()
    electricity: boolean;

    @Field(() => [String])
    sports: string[];

    @Field()
    is_indoor: boolean;

    @Field()
    size: boolean;

    @Field()
    highschool_compatible: boolean;
}
