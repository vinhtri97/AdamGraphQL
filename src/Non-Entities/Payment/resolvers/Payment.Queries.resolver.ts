/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserTypes } from 'src/Entities/Users/Generic/enums';
import Stripe = require('stripe');
import { Arg, Query, Resolver } from 'type-graphql';

import Coach from '../../../Entities/Users/Coach/schema/Coach.schema';
import Director from '../../../Entities/Users/Director/schema/Director.schema';
import Player from '../../../Entities/Users/Player/schema/Player.schema';
import Spectator from '../../../Entities/Users/Spectator/schema/Spectator.schema';

const keySecret = 'sk_test_PMfzgdS4UGqEVsR3iwdTtss9';
const stripe = new Stripe(keySecret);

@Resolver()
export class PaymentQueryResolver {
    @Query()
    async getAllTransactions(@Arg('customerID') customerID: string): Promise<Stripe.charges.ICharge[]> {
        return (await stripe.charges.list({ customer: customerID })).data;
    }

    @Query()
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
        const response = await stripe.customers.listSources(foundUser.customerID, { object: 'card', limit: 3 });
        const sources = response.data;
        const arrayToFilter = sources;
        const filteredCards = arrayToFilter.filter(
            (thing, index, self) => index === self.findIndex(t => t.fingerprint === thing.fingerprint)
        );
        console.log(filteredCards);
        return filteredCards;
    }
}
