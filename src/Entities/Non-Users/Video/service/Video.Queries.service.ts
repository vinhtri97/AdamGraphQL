/* eslint-disable @typescript-eslint/no-explicit-any */
import Coach from '../../../Users/Coach/schema/Coach.schema';
import Director from '../../../Users/Director/schema/Director.schema';
import Player from '../../../Users/Player/schema/Player.schema';
import Spectator from '../../../Users/Spectator/schema/Spectator.schema';
import { GetVideoLikes } from '../dto/classes/Video.GetVideoLikes';
import VideoDto from '../dto/Video.dto';
import Video from '../schema/Video.schema';

export class VideoQueryService {
    async getVideos(): Promise<Array<VideoDto>> {
        return await Video.find({}).lean();
    }

    async getLikes(vidID: string): Promise<GetVideoLikes> {
        const foundVideo: any = await Video.findById(vidID)
            .limit(1)
            .lean();
        if (!foundVideo) throw new Error('No video with that ID');
        const IDObj = {
            players: [],
            spectators: [],
            directors: [],
            coaches: [],
        };
        const returnObj = {
            players: [],
            spectators: [],
            directors: [],
            coaches: [],
        };
        foundVideo.likes.forEach((vidObj: { type: any; id: { toString: () => any } }) => {
            switch (vidObj.type) {
                case 'Player':
                    IDObj.players.push(vidObj.id.toString());
                    break;
                case 'Spectator':
                    IDObj.spectators.push(vidObj.id.toString());
                    break;
                case 'Director':
                    IDObj.directors.push(vidObj.id.toString());
                    break;
                case 'Coach':
                    IDObj.coaches.push(vidObj.id.toString());
                    break;
                default:
                    break;
            }
        });
        const foundPlayers: any = await Player.find({ _id: { $in: IDObj.players } }).lean();
        if (foundPlayers.length != IDObj.players.length) {
            // TODO handle deleted
            console.log('Invalid players');
        }
        const foundSpectators: any = await Spectator.find({ _id: { $in: IDObj.spectators } }).lean();
        if (foundSpectators.length != IDObj.spectators.length) {
            console.log('Invalid spectators');
        }
        const foundDirectors: any = await Director.find({ _id: { $in: IDObj.directors } }).lean();
        if (foundDirectors.length != IDObj.directors.length) {
            console.log('Invalid directors');
        }
        const foundCoaches: any = await Coach.find({ _id: { $in: IDObj.coaches } }).lean();
        if (foundCoaches.length != IDObj.coaches.length) {
            console.log('Invalid directors');
        }
        returnObj.players = foundPlayers;
        returnObj.spectators = foundSpectators;
        returnObj.directors = foundDirectors;
        returnObj.coaches = foundCoaches;

        return returnObj;
    }
}
