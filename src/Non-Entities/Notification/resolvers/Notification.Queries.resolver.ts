import { Args, Query, Resolver } from 'type-graphql';

import { UserTypes } from '../../../Entities/Users/Generic/enums';
import { PushMessage } from '../dto/Message';
import { TokenDto } from '../dto/Token';
import CreateToken from './helpers/CreateTokens';
import SendMessage from './helpers/SendMessage';

@Resolver()
export class NotificationQueryResolver {
    @Query(() => Boolean)
    // TODO test different inputs
    // Worry about user type efficiency
    async sendPushNotification(@Args() input: TokenDto): Promise<boolean> {
        // Input all user types if empty
        if (input.userTypes.length < 1) input.userTypes = Object.keys(UserTypes);
        // Check that valid user types are sent
        const hasValidUserTypes = input.userTypes.every(type => Object.keys(UserTypes).includes(type));
        if (!hasValidUserTypes)
            throw new Error('An invalid user type was passed. Must be in:' + Object.keys(UserTypes).toString());
        // begin
        if (!input.data.index) input.data.index = 0;
        const messages: Array<PushMessage> = await CreateToken(input);
        console.log('messages', messages);
        const result = await SendMessage(messages);
        console.log('result', result);

        return true;
    }
}
