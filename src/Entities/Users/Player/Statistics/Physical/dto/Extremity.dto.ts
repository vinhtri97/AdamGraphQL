import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('ExtremityInput')
export class Extremity {
    @Field()
    wing_span: number;

    @Field()
    hand_size: number;

    @Field()
    shoe_size: number;
}
