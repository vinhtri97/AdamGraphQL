import { Arg, Args, Mutation, Resolver } from 'type-graphql';

import { UserTypes } from '../../../Users/Generic/enums/UserTypes';
import { CreateVideoInput } from '../dto/classes/Video.CreateInput';
import { UpdateVideoInput } from '../dto/classes/Video.UpdateInput';
import { VideoMutationService } from '../service';

@Resolver()
export class VideoMutationResolver {
    VideoMutationService: VideoMutationService;
    constructor() {
        this.VideoMutationService = new VideoMutationService();
    }

    // TODO validate uploadedBy id?
    @Mutation(() => Boolean)
    async createVideo(@Args() input: CreateVideoInput): Promise<boolean | Error> {
        return await this.VideoMutationService.createVideo(input);
    }

    @Mutation(() => Boolean)
    async updateVideo(@Args() input: UpdateVideoInput): Promise<boolean | Error> {
        return await this.VideoMutationService.updateVideo(input);
    }

    @Mutation(() => Boolean)
    async changeVideoLike(
        @Arg('vidID') vidID: string,
        @Arg('userID') userID: string,
        @Arg('userType') userType: string,
        @Arg('liked') liked: boolean
    ): Promise<boolean | Error> {
        if (!Object.keys(UserTypes).includes(userType))
            throw new Error('User type must be in:' + Object.keys(UserTypes));
        return await this.VideoMutationService.changeLike(vidID, userID, userType, liked);
    }
}
