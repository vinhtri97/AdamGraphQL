import { Field, InputType, ObjectType } from 'type-graphql';

import { Strength } from './Strength.dto';
import { Throw } from './Throw.dto';

@ObjectType()
export class PowerDto {
    @Field()
    power_score: number;

    @Field(() => Strength)
    strength: Strength;

    @Field(() => Throw)
    throw: Throw;
}

@InputType('PowerInput')
export class PowerInputDto {
    @Field(() => Strength)
    strength: Strength;

    @Field(() => Throw)
    throw: Throw;
}
