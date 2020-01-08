/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import ChatDto from "../dto/Chat.dto";
import Chat from "../schema/Chat.schema";
import { ChatQueryService } from "../service/index";
import { GetUsersDto } from "../dto/classes/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class ChatQueryResolver {
    ChatQueryService: ChatQueryService;
    constructor() {
        this.ChatQueryService = new ChatQueryService();
    }

    @Query(() => [ChatDto])
    async getChats(): Promise<Array<ChatDto>> {
        return await this.ChatQueryService.getChats();
    }

    @Query(() => ChatDto)
    async getChatByID(@Arg("id") id: string): Promise<ChatDto> {
        return await Chat.findById(id).lean();
    }

    @Query(() => GetUsersDto)
    async getChatUsers(@Arg("id") id: string): Promise<GetUsersDto | Error> {
        return await this.ChatQueryService.getUsers(id);
    }
}
