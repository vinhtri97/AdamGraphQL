/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import BugDto from "../dto/Bug.dto";
import Bug from "../schema/Bug.schema";
import { BugQueryService } from "../service/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class BugQueryResolver {
    BugQueryService: BugQueryService;
    constructor() {
        this.BugQueryService = new BugQueryService();
    }

    @Query(() => [BugDto])
    async getBugs(): Promise<Array<BugDto>> {
        return await this.BugQueryService.getBugs();
    }

    @Query(() => BugDto)
    async getBugByID(@Arg("id") id: string): Promise<BugDto> {
        return await Bug.findById(id).lean();
    }
}
