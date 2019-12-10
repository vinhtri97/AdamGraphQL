import Video from "../schema/Video.schema";
// import VideoDto from "../dto/Video.dto";
import { CreateVideoInput, UpdateVideoInput } from "../dto/classes/index";
// import { VideoUser } from "../dto/classes/types/index";
import { updateDocument } from "../../../Functions";
// import Spectator from "";

export class VideoMutationService {
    async createVideo(input: CreateVideoInput): Promise<boolean | Error> {
        // const { players, coaches, spectators, directors } = input;
        await Video.create(input);
        // await Promise.all(spectators.map(({id:spectID}: VideoUser) => await ))
        return true;
    }

    async updateVideo(input: UpdateVideoInput): Promise<boolean | Error> {
        return await updateDocument(Video, input);
    }
}
