import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('BMIInput')
export class BMI {
    @Field()
    height: string;

    @Field()
    weight: string;
}
