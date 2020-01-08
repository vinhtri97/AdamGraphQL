import { Mutation, Resolver, Args } from "type-graphql";
// import VideoDto from "../dto/Video.dto";
// import Video from "../schema/Video.schema";
import { VideoMutationService } from "../service/index";
import { CreateVideoInput, UpdateVideoInput } from "../dto/classes/index";
@Resolver()
export class VideoMutationResolver {
    VideoMutationService: VideoMutationService;
    constructor() {
        this.VideoMutationService = new VideoMutationService();
    }

    // TODO validate uploadedBy id?
    @Mutation(() => Boolean)
    async createVideo(
        @Args() input: CreateVideoInput
    ): Promise<boolean | Error> {
        return await this.VideoMutationService.createVideo(input);
    }

    @Mutation(() => Boolean)
    async updateVideo(
        @Args() input: UpdateVideoInput
    ): Promise<boolean | Error> {
        return await this.VideoMutationService.updateVideo(input);
    }
}
