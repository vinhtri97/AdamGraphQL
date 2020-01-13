import { Field, ObjectType } from 'type-graphql';

import {
    AcademicsDto,
    AgilityDto,
    BaseballDto,
    BasketballDto,
    PhysicalDto,
    PowerDto,
    SoccerDto,
    TennisDto,
    VolleyballDto,
} from './Statistics.index';

@ObjectType()
export class Statistics {
    @Field(() => [BasketballDto])
    basketball: BasketballDto[];

    @Field(() => [BaseballDto])
    baseball: BaseballDto[];

    @Field(() => [SoccerDto])
    soccer: SoccerDto[];

    @Field(() => [TennisDto])
    tennis: TennisDto[];

    @Field(() => [VolleyballDto])
    volleyball: VolleyballDto[];

    @Field(() => [AcademicsDto])
    academics: AcademicsDto[];

    @Field(() => [PhysicalDto])
    physical: PhysicalDto[];

    @Field(() => [AgilityDto])
    agility: AgilityDto[];

    @Field(() => [PowerDto])
    power: PowerDto[];
}
