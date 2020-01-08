import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class StatsFields {
    @Field()
    value: number;

    @Field()
    certified: boolean;

    @Field()
    certifying_entity: string;
}
