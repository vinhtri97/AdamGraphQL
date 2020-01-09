/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('CardDtoInput')
export default class CardDto {
    @Field()
    'id': string;

    @Field()
    'object': string;

    @Field({ nullable: true })
    'address_city'?: string;

    @Field({ nullable: true })
    'address_country'?: string;

    @Field({ nullable: true })
    'address_line1'?: string;

    @Field({ nullable: true })
    'address_line1_check'?: string;

    @Field({ nullable: true })
    'address_line2'?: string;

    @Field({ nullable: true })
    'address_state'?: string;

    @Field({ nullable: true })
    'address_zip'?: string;

    @Field({ nullable: true })
    'address_zip_check'?: string;

    @Field()
    'brand': string;

    @Field()
    'country': string;

    @Field()
    'cvc_check': string;

    @Field()
    'dynamic_last4': string;

    @Field()
    'exp_month': number;

    @Field()
    'exp_year': number;

    @Field()
    'fingerprint': string;

    @Field()
    'funding': string;

    @Field()
    'last4': string;

    @Field({ nullable: true })
    'metadata'?: string;

    @Field({ nullable: true })
    'name'?: string;

    @Field({ nullable: true })
    'tokenization_method'?: string;
}
