import Stripe = require('stripe');
import { Arg, Query, Resolver } from 'type-graphql';

import Coach from '../../../Entities/Users/Coach/schema/Coach.schema';
import Director from '../../../Entities/Users/Director/schema/Director.schema';
import { UserTypes } from '../../../Entities/Users/Generic/enums';
import Player from '../../../Entities/Users/Player/schema/Player.schema';
import Spectator from '../../../Entities/Users/Spectator/schema/Spectator.schema';
import CardDto from '../dto/classes/CardDto';
import AllTransactions from '../dto/classes/GetTransactions';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
const keySecret = 'sk_test_PMfzgdS4UGqEVsR3iwdTtss9';
const stripe = new Stripe(keySecret);

@Resolver()
export class PaymentQueryResolver {
    @Query(() => [AllTransactions])
    // Stripe.charges.ICharge[]
    async getAllTransactions(@Arg('customerID') customerID: string): Promise<AllTransactions[]> {
        const things = (await stripe.charges.list({ customer: customerID })).data;
        const myReturn = things.map(
            ({
                object,
                application,
                application_fee,
                application_fee_amount,
                balance_transaction,
                customer,
                destination,
                dispute,
                invoice,
                metadata,
                order,
                outcome,
                payment_method_details,
                refunds,
                review,
                shipping,
                source,
                billing_details,
                source_transfer,
                transfer,
                ...rest
            }) => {
                return { ...rest };
            }
        );
        return myReturn;
    }

    @Query(() => [CardDto])
    async getCustomerCards(
        @Arg('userID') userID: string,
        @Arg('userType') userType: string
    ): Promise<Stripe.cards.ICard[]> {
        if (!Object.keys(UserTypes).includes(userType)) throw new Error('Invalid user type');
        let foundUser: any = true;
        switch (userType) {
            case 'Spectator':
                foundUser = await Spectator.findById(userID).limit(1);
                break;
            case 'Coach':
                foundUser = await Coach.findById(userID).limit(1);
                break;
            case 'Director':
                foundUser = await Director.findById(userID).limit(1);
                break;
            case 'Player':
                foundUser = await Player.findById(userID).limit(1);
                break;
            default:
                console.log('New user type');
                return [];
        }
        if (!foundUser) throw new Error('Cannot find user with that ID');
        const response = await stripe.customers.listSources('cus_GN7jXR0PxNrfii', {
            include: [],
            limit: 3,
            object: 'card',
        });
        const sources = response.data;
        // const arrayToFilter = sources;
        // const filteredCards = arrayToFilter.filter(
        //     (thing, index, self) => index === self.findIndex(t => t.fingerprint === thing.fingerprint)
        // );
        console.log(sources);
        return sources;
    }
}
