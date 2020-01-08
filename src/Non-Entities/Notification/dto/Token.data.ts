/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('TokenDataDtoInput')
//const { ids, title, message, data: { screen } } = input;
export default class TokenDataDto {
    @Field()
    screen: string;

    @Field({ nullable: true })
    index?: number;
}
