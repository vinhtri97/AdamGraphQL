/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';

import { updateDocument } from '../../../../MongooseFunctions';
import Player from '../../../Users/Player/schema/Player.schema';
import { CreateVideoInput } from '../dto/classes/Video.CreateInput';
import { UpdateVideoInput } from '../dto/classes/Video.UpdateInput';
import Video from '../schema/Video.schema';

const {
    Types: { ObjectId },
} = mongoose;

export class VideoMutationService {
    async createVideo(input: CreateVideoInput): Promise<boolean | Error> {
        const { playerID, ...rest } = input;
        const foundPlayer: any = await Player.findById(playerID).limit(1);
        if (!foundPlayer) throw new Error('Invalid PlayerID');

        const createdVideo = await Video.create(rest);
        const isSelf = playerID == rest.uploaded_by.id;
        foundPlayer.videos.push({ id: ObjectId(createdVideo._id), accepted: isSelf });
        foundPlayer.save();
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
            const idAlreadyExists = foundVideo.likes.some(obj => obj.id.toString() == userID);
            if (!idAlreadyExists) foundVideo.likes.push({ id: ObjectId(userID), type: userType });
        } else {
            foundVideo.likes = foundVideo.likes.filter(obj => obj.id.toString() !== userID);
        }

        // TODO use userType?
        console.log('use this for player:', userType);

        foundVideo.save();
        return true;
    }
}
