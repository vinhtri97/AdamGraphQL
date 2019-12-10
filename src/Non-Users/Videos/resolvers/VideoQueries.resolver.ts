/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import VideoDto from "../dto/Video.dto";
import Video from "../schema/Video.schema";
import { VideoQueryService } from "../service/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class VideoQueryResolver {
    VideoQueryService: VideoQueryService;
    constructor() {
        this.VideoQueryService = new VideoQueryService();
    }

    @Query(() => [VideoDto])
    async getVideos(): Promise<Array<VideoDto>> {
        return await this.VideoQueryService.getVideos();
    }

    @Query(() => VideoDto)
    async getVideoByID(@Arg("id") id: string): Promise<VideoDto> {
        return await Video.findById(id).lean();
    }
}
