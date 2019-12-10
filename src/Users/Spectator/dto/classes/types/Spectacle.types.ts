import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("SpectacleObjInput")
export class SpectacleObj {
    @Field()
    type: string;

    @Field()
    id: string;
}
