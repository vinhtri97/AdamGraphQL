import { Mutation, Resolver, Args } from "type-graphql";
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
}
