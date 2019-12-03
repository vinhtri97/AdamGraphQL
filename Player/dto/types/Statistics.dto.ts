import { Basketball } from "./Stats/index";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Statistics {
    @Field(() => [Basketball])
    basketball_stats: Basketball[];

    @Field()
    baseball_stats: string;

    @Field()
    soccer_stats: string;

    @Field()
    tennis_stats: string;

    @Field()
    volleyball_stats: string;

    @Field()
    academics: string;

    @Field()
    physical: string;

    @Field()
    agility: string;

    @Field()
    power: string;
}
