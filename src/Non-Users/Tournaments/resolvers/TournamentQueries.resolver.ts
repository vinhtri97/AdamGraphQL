/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import TournamentDto from "../dto/Tournament.dto";
import Tournament from "../schema/Tournament.schema";
import { TournamentQueryService } from "../service/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class TournamentQueryResolver {
    TournamentQueryService: TournamentQueryService;
    constructor() {
        this.TournamentQueryService = new TournamentQueryService();
    }

    @Query(() => [TournamentDto])
    async getTournaments(): Promise<Array<TournamentDto>> {
        return await this.TournamentQueryService.getTournaments();
    }

    @Query(() => TournamentDto)
    async getTournamentByID(@Arg("id") id: string): Promise<TournamentDto> {
        return await Tournament.findById(id).lean();
    }
}
