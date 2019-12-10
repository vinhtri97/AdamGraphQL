import Video from "../schema/Video.schema";
import VideoDto from "../dto/Video.dto";
export class VideoQueryService {
    async getVideos(): Promise<Array<VideoDto>> {
        return await Video.find({}).lean();
    }
}
