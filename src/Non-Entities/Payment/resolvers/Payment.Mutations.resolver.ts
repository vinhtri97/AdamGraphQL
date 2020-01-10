import Stripe = require('stripe');
import { Arg, Mutation, Resolver } from 'type-graphql';

import Coach from '../../../Entities/Users/Coach/schema/Coach.schema';
import Director from '../../../Entities/Users/Director/schema/Director.schema';
import { UserTypes } from '../../../Entities/Users/Generic/enums';
import Player from '../../../Entities/Users/Player/schema/Player.schema';
import Spectator from '../../../Entities/Users/Spectator/schema/Spectator.schema';
import StripeTokenDto from '../dto/Token';

/* eslint-disable @typescript-eslint/no-explicit-any */
const keySecret = 'sk_test_PMfzgdS4UGqEVsR3iwdTtss9';
const stripe = new Stripe(keySecret);
// const stripe: Stripe = require('stripe')(keySecret);

@Resolver()
export class PaymentMutationResolver {
    // TODO add token
    @Mutation(() => Boolean)
    async addCard(
        @Arg('userID') userID: string,
        @Arg('customerID') customerID: string,
        @Arg('userType') userType: string,
        @Arg('token') token: StripeTokenDto
    ): Promise<boolean> {
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
                return false;
        }
        if (!foundUser) throw new Error('Cannot find user with that ID');
        if (customerID == 'none') {
            const createdCustomer = await stripe.customers.create({ source: token.id });
            foundUser.customerID = createdCustomer.id;
            foundUser.save();
            return createdCustomer.id ? true : false;
        } else return (await stripe.customers.createSource(customerID, { source: token.id })).id ? true : false;
    }

    @Mutation(() => Boolean)
    async deleteCard(
        @Arg('userID') userID: string,
        @Arg('customerID') customerID: string,
        @Arg('cardID') cardID: string,
        @Arg('userType') userType: string
    ): Promise<boolean> {
        if (!Object.keys(UserTypes).includes(userType)) throw new Error('Invalid user type');
        let foundUser: any = false;
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
                return false;
        }
        if (!foundUser) throw new Error('Cannot find user with that ID');
        return (await stripe.customers.deleteSource(customerID, cardID)).deleted;
    }

    @Mutation(() => Boolean)
    async chargeUser(
        @Arg('customerID') customerID: string,
        @Arg('cardID') cardID: string,
        @Arg('amount') amount: number,
        @Arg('description') description: string
    ): Promise<boolean> {
        const chargeAmount = 100 * amount;
        const charge = await stripe.charges.create({
            amount: chargeAmount,
            description,
            currency: 'usd',
            customer: customerID,
            source: cardID,
        });
        console.log(charge);
        return true;
    }
}
