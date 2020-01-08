/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import ParkDto from "../dto/Park.dto";
import Park from "../schema/Park.schema";
import { ParkQueryService } from "../service/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class ParkQueryResolver {
    ParkQueryService: ParkQueryService;
    constructor() {
        this.ParkQueryService = new ParkQueryService();
    }

    @Query(() => [ParkDto])
    async getParks(): Promise<Array<ParkDto>> {
        return await this.ParkQueryService.getParks();
    }

    @Query(() => ParkDto)
    async getParkByID(@Arg("id") id: string): Promise<ParkDto> {
        return await Park.findById(id).lean();
    }
}
