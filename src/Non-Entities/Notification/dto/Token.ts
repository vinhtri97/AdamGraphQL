import { ArgsType, Field } from 'type-graphql';

import { TokenDataDto } from './Token.data';

/* eslint-disable @typescript-eslint/no-explicit-any */
@ArgsType()
export class TokenDto {
    @Field(() => [String])
    userTypes: string[];

    @Field(() => [String])
    ids: string[];

    @Field()
    title: string;

    @Field()
    message: string;

    @Field(() => TokenDataDto)
    data: TokenDataDto;
}
