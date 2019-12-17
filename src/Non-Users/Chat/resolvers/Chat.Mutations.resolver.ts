import { Mutation, Resolver, Args, Arg } from "type-graphql";
// import ChatDto from "../dto/Chat.dto";
// import Chat from "../schema/Chat.schema";
import { ChatMutationService } from "../service/index";
import { CreateChatInput, UpdateChatInput } from "../dto/classes/index";
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
        @Arg("chatID") chatID: string,
        // eslint-disable-next-line @typescript-eslint/camelcase
        @Arg("user_type") user_type: string,
        @Arg("userID") userID: string
    ): Promise<boolean | Error> {
        return await this.ChatMutationService.addUser(
            chatID,
            user_type,
            userID
        );
    }

    @Mutation(() => Boolean)
    async removeUserFromChat(
        @Arg("chatID") chatID: string,
        // eslint-disable-next-line @typescript-eslint/camelcase
        @Arg("user_type") user_type: string,
        @Arg("userID") userID: string
    ): Promise<boolean | Error> {
        return await this.ChatMutationService.removeUser(
            chatID,
            user_type,
            userID
        );
    }

    @Mutation(() => Boolean)
    async changeMutedStatusInChat(
        @Arg("chatID") chatID: string,
        @Arg("muted") muted: boolean,
        // eslint-disable-next-line @typescript-eslint/camelcase
        @Arg("muted_type") muted_type: string,
        @Arg("userID") userID: string
    ): Promise<boolean | Error> {
        return await this.ChatMutationService.changeMutedStatus(
            chatID,
            muted,
            muted_type,
            userID
        );
    }
}
