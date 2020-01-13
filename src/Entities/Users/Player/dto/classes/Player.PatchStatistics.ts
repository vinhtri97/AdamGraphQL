import { ArgsType, Field } from 'type-graphql';

import { AcademicsDto, AgilityDto, PhysicalDto, PowerInputDto } from '../../Statistics/Statistics.index';

@ArgsType()
export default class PatchStatistics {
    @Field(() => AcademicsDto, { nullable: true })
    academics?: AcademicsDto;

    @Field(() => AgilityDto, { nullable: true })
    agility?: AgilityDto;

    @Field(() => PhysicalDto, { nullable: true })
    physical?: PhysicalDto;

    @Field(() => PowerInputDto, { nullable: true })
    power?: PowerInputDto;
}
