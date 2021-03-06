import { Field, ObjectType } from 'type-graphql';

import { Address, Personal } from './classes/types';

@ObjectType()
export default class UserDto {
    @Field()
    _id: string;

    @Field()
    firebase_id: string;

    @Field()
    email: string;

    @Field()
    thumbnail: string;

    @Field()
    user_type: string;

    @Field({ nullable: true })
    banner: string;

    @Field(() => [String])
    tokens: string[];

    @Field(() => Personal)
    personal: Personal;

    @Field(() => Address, { nullable: true })
    address: Address;

    // TODO authentication?
    @Field()
    customerID: string;
}
