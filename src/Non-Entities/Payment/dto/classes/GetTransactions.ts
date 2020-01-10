import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class FraudDetails {
    @Field()
    user_report?: 'fraudulent' | 'safe';
    @Field()
    stripe_report?: 'fraudulent';
}

@ObjectType()
class TransferData {
    @Field()
    amount?: number;
    @Field()
    destination: string;
}

@ObjectType()
export default class AllTransactions {
    // object: "charge";
    // application?: string | Stripe.applications.IApplication;
    // application_fee?: string | Stripe.applicationFees.IApplicationFee;
    // application_fee_amount?: number;
    // balance_transaction: string | Stripe.balance.IBalanceTransaction;
    // customer: string | Stripe.customers.ICustomer;
    // destination?: string | Stripe.accounts.IAccount;
    // dispute?: string | Stripe.disputes.IDispute;
    // invoice: string | Stripe.invoices.IInvoice;
    // metadata: Stripe.IMetadata;
    // order: string | Stripe.orders.IOrder;
    // outcome?: Stripe.charges.IOutcome;
    // payment_method_details: Stripe.charges.IPaymentMethodDetails;
    // refunds: Stripe.charges.IChargeRefunds;
    // review?: string | Stripe.reviews.IReview;
    // shipping?: Stripe.IShippingInformation;
    // source: Stripe.IStripeSource;
    // billing_details?: { address?: Stripe.IAddress; email?: string; name?: string; phone?: string };
    // source_transfer: string | ITransfer;
    // transfer?: string;
    @Field()
    amount: number;
    @Field()
    amount_refunded: number;
    @Field()
    captured: boolean;
    @Field()
    created: number;
    @Field()
    currency: string;
    @Field()
    description?: string;
    @Field()
    failure_code: string;
    @Field()
    failure_message: string;
    @Field(() => FraudDetails)
    fraud_details: FraudDetails;
    @Field()
    livemode: boolean;
    @Field()
    on_behalf_of?: string;
    @Field()
    paid: boolean;
    @Field()
    payment_intent?: string;
    @Field()
    payment_method: string;
    @Field()
    receipt_email: string;
    @Field()
    receipt_number: string;
    @Field()
    receipt_url: string;
    @Field()
    refunded: boolean;
    @Field()
    statement_descriptor: string;
    @Field()
    statement_descriptor_suffix?: string;
    @Field()
    status: 'succeeded' | 'pending' | 'failed';
    @Field(() => TransferData)
    transfer_data?: TransferData;
    @Field()
    transfer_group?: string;
    @Field()
    id: string;
}
