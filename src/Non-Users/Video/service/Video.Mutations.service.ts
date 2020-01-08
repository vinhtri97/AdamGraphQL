import * as mongoose from 'mongoose';

import { updateDocument } from '../../../MongooseFunctions';
import { CreateVideoInput, UpdateVideoInput } from '../dto/classes';
import Video from '../schema/Video.schema';

const {
    Types: { ObjectId }
} = mongoose;

export class VideoMutationService {
    async createVideo(input: CreateVideoInput): Promise<boolean | Error> {
        await Video.create(input);
        return true;
    }

    async updateVideo(input: UpdateVideoInput): Promise<boolean | Error> {
        return await updateDocument(Video, input);
    }

    async changeLike(vidID: string, userID: string, userType: string, liked: boolean): Promise<boolean | Error> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundVideo: any = await Video.findById(vidID).limit(1);
        if (!foundVideo) throw new Error('Video cannot be found with that ID.');
        if (liked) {
            if (!foundVideo.likes.includes(ObjectId(userID))) foundVideo.likes.push(ObjectId(userID));
        } else {
            foundVideo.likes = foundVideo.likes.filter((id: { toString: () => string }) => id.toString() !== userID);
        }

        // TODO use userType?
        console.log('use this?:', userType);

        foundVideo.save();
        return true;
    }
}
