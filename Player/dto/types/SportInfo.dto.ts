import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class SportInfo {
    @Field()
    position: string;

    @Field()
    secondary_position: string;

    @Field()
    throwing: string;

    @Field()
    batting: string;

    @Field()
    sport: string;

    @Field()
    committed: string;

    @Field()
    committed_date: string;
}
