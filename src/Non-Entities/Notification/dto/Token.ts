/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ObjectType } from 'type-graphql';

import TokenDataDto from './Token.data';

@ObjectType()
@InputType('TokenDtoInput')
//const { ids, title, message, data: { screen } } = input;
export default class TokenDto {
    @Field(() => [String])
    ids: string[];

    @Field()
    title: string;

    @Field()
    message: string;

    @Field(() => TokenDataDto)
    data: TokenDataDto;
}
