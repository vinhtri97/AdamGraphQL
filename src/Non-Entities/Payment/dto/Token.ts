/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ObjectType } from 'type-graphql';

import CardDto from './classes/CardDto';

@ObjectType()
@InputType('StripeTokenDtoInput')
export default class StripeTokenDto {
    @Field()
    'id': string;

    @Field()
    'object': string;

    @Field(() => CardDto)
    'card': CardDto;

    @Field()
    'client_ip'?: string;

    @Field()
    'created': number;

    @Field()
    'livemode': boolean;

    @Field()
    'type': string;

    @Field()
    'used': boolean;
}
