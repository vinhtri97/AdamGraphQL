import {
    Basketball,
    Baseball,
    Tennis,
    Volleyball,
    Soccer,
    Academics,
    Physical,
    Agility,
    Power
} from "./Stats/index";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("StatisticsInput")
export class Statistics {
    @Field(() => [Basketball])
    basketball_stats: Basketball[];

    @Field(() => [Baseball])
    baseball_stats: Baseball[];

    @Field(() => [Soccer])
    soccer_stats: Soccer[];

    @Field(() => [Tennis])
    tennis_stats: Tennis[];

    @Field(() => [Volleyball])
    volleyball_stats: Volleyball[];

    @Field(() => [Academics])
    academics: Academics[];

    @Field(() => [Physical])
    physical: Physical[];

    @Field(() => [Agility])
    agility: Agility[];

    @Field(() => [Power])
    power: Power[];
}
