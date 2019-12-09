/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import TeamDto from "../dto/Team.dto";
import Team from "../schema/Team.schema";
import { TeamQueryService } from "../service/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class TeamQueryResolver {
    teamQueryService: TeamQueryService;
    constructor() {
        this.teamQueryService = new TeamQueryService();
    }

    @Query(() => [TeamDto])
    async getTeams(): Promise<Array<TeamDto>> {
        return await this.teamQueryService.getTeams();
    }

    @Query(() => TeamDto)
    async getTeamByID(@Arg("id") id: string): Promise<TeamDto> {
        return await Team.findById(id).lean();
    }
}
