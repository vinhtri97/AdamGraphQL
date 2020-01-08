import { Arg, Args, Mutation, Resolver } from 'type-graphql';

import { UserTypes } from '../../../Users/Generic/enums';
import { CreateChatInput, UpdateChatInput } from '../dto/classes';
import { ChatMutationService } from '../service';

// import ChatDto from "../dto/Chat.dto";
// import Chat from "../schema/Chat.schema";
@Resolver()
export class ChatMutationResolver {
    ChatMutationService: ChatMutationService;
    constructor() {
        this.ChatMutationService = new ChatMutationService();
    }

    @Mutation(() => Boolean)
    async createChat(@Args() input: CreateChatInput): Promise<boolean | Error> {
        return await this.ChatMutationService.createChat(input);
    }

    @Mutation(() => Boolean)
    async updateChat(@Args() input: UpdateChatInput): Promise<boolean | Error> {
        return await this.ChatMutationService.updateChat(input);
    }

    @Mutation(() => Boolean)
    async addUserToChat(
        @Arg('chatID') chatID: string,
        // eslint-disable-next-line @typescript-eslint/camelcase
        @Arg('user_type') user_type: string,
        @Arg('userID') userID: string
    ): Promise<boolean | Error> {
        if (!Object.keys(UserTypes).includes(user_type))
            throw new Error('Invalid User Type. Must be in:' + Object.keys(UserTypes).toString());
        return await this.ChatMutationService.addUser(chatID, user_type, userID);
    }

    @Mutation(() => Boolean)
    async removeUserFromChat(
        @Arg('chatID') chatID: string,
        // eslint-disable-next-line @typescript-eslint/camelcase
        @Arg('user_type') user_type: string,
        @Arg('userID') userID: string
    ): Promise<boolean | Error> {
        if (!Object.keys(UserTypes).includes(user_type))
            throw new Error('Invalid User Type. Must be in:' + Object.keys(UserTypes).toString());
        return await this.ChatMutationService.removeUser(chatID, user_type, userID);
    }

    @Mutation(() => Boolean)
    async changeMutedStatusInChat(
        @Arg('chatID') chatID: string,
        @Arg('muted') muted: boolean,
        // eslint-disable-next-line @typescript-eslint/camelcase
        @Arg('muted_type') muted_type: string,
        @Arg('userID') userID: string
    ): Promise<boolean | Error> {
        return await this.ChatMutationService.changeMutedStatus(chatID, muted, muted_type, userID);
    }
}
