/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType } from 'type-graphql';

@InputType('TokenDataInput')
export class TokenDataDto {
    @Field()
    screen: string;

    @Field({ nullable: true, defaultValue: 0 })
    index?: number;
}
