import { Arg, Query, Resolver } from 'type-graphql';

import { GetVideoLikes } from '../dto/classes/Video.GetVideoLikes';
import VideoDto from '../dto/Video.dto';
import Video from '../schema/Video.schema';
import { VideoQueryService } from '../service';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
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
    async getVideoByID(@Arg('vidID') vidID: string): Promise<VideoDto> {
        return await Video.findById(vidID).lean();
    }

    @Query(() => GetVideoLikes)
    async getVideoLikes(@Arg('vidID') vidID: string): Promise<GetVideoLikes> {
        return await this.VideoQueryService.getLikes(vidID);
    }
}
