import { Field, InputType, ObjectType } from 'type-graphql';

import { Jump } from './Jump.dto';
import { Movement } from './Movement.dto';
import { Speed } from './Speed.dto';

@ObjectType()
@InputType('AgilityInput')
export class AgilityDto {
    @Field()
    jump_score: number;

    @Field()
    agility_score: number;

    @Field()
    speed_score: number;

    @Field()
    core_score: number;

    @Field(() => Movement)
    movement: Movement;

    @Field(() => Speed)
    speed: Speed;

    @Field(() => Jump)
    jump: Jump;
}
