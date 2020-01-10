import { Field, InputType, ObjectType } from 'type-graphql';

/* eslint-disable @typescript-eslint/no-explicit-any */
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

// export default class StripeCard implements Stripe.cards.ICard {
//     account?: string | Stripe.accounts.IAccount;
//     currency?: string;
//     customer?: string | Stripe.customers.ICustomer;
//     default_for_currency?: boolean;
//     recipient?: string | Stripe.recipients.IRecipient;
//     id: string;
//     object: 'card';
//     number?: string;
//     brand: 'Visa' | 'American Express' | 'MasterCard' | 'Discover' | 'JCB' | 'Diners Club' | 'Unknown';
//     exp_month: number;
//     exp_year: number;
//     funding: 'credit' | 'debit' | 'prepaid' | 'unknown';
//     last4: string;
//     address_city: string;
//     address_country: string;
//     address_line1: string;
//     address_line1_check: 'pass' | 'fail' | 'unavailable' | 'unchecked';
//     address_line2: string;
//     address_state: string;
//     address_zip: string;
//     address_zip_check: 'pass' | 'fail' | 'unavailable' | 'unchecked';
//     country: string;
//     cvc_check: 'pass' | 'fail' | 'unavailable' | 'unchecked';
//     dynamic_last4: string;
//     name: string;
//     fingerprint: string;
//     metadata?: Stripe.IMetadata;
//     tokenization_method: 'apple_pay' | 'android_pay';
// }
