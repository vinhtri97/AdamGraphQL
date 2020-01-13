import { Field, InputType, ObjectType } from 'type-graphql';

import { BMI } from './BMI.dto';
import { Dominance } from './Dominance.dto';
import { Extremity } from './Extremity.dto';

@ObjectType()
@InputType('PhysicalInput')
export class PhysicalDto {
    @Field(() => BMI)
    bmi: BMI;

    @Field(() => Extremity)
    extremity: Extremity;

    @Field(() => Dominance)
    dominance: Dominance;
}
