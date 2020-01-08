import { Field, ObjectType } from 'type-graphql';

import CoachDto from '../../../Coach/dto/Coach.dto';

@ObjectType()
export class GetCoachesDto {
    @Field(() => [CoachDto])
    accepted: CoachDto[];

    @Field(() => [CoachDto])
    pending: CoachDto[];
}
