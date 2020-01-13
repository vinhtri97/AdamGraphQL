import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('PowerScoreInput')
export class PowerScore {
    @Field(() => String)
    value: string;

    @Field(() => Date)
    Date: Date;
}
