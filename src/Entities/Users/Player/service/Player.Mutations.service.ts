import * as AWS from 'aws-sdk';

import { getNestedTrueFalseObjects, handleSpectatorRemoved, handleTeamChatsForParents } from '../../../../Functions';
import { changeInObjArray, updateDocument } from '../../../../MongooseFunctions';
import Chat from '../../../Non-Users/Chat/schema/Chat.schema';
import Team from '../../../Non-Users/Team/schema/Team.schema';
import Video from '../../../Non-Users/Video/schema/Video.schema';
import { SpectatorTypes } from '../../Spectator/enums';
import Spectator from '../../Spectator/schema/Spectator.schema';
import { UpdatePlayerInput } from '../dto/classes/Player.UpdateInput';
import Player from '../schema/Player.schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class PlayerMutationService {
    async updatePlayer(input: UpdatePlayerInput): Promise<boolean | Error> {
        return await updateDocument(Player, input);
    }

    async acceptSpectator(playerID: string, spectatorID: string, type: string): Promise<boolean | Error> {
        if (!Object.keys(SpectatorTypes).includes(type))
            throw new Error('Spectator type must be one of: ' + Object.keys(SpectatorTypes).toString());
        if (type != 'Spectator') {
            const teams = await getNestedTrueFalseObjects(Player, playerID, 'teams', 'teams');

            const foundTeams: any = await Team.find({
                _id: {
                    $in: teams.accepted.map(({ _id: teamID }: { _id: string }) => teamID),
                },
            });
            const foundTeamsFullChatIDs: any = foundTeams.map((teamObj: any) => teamObj.fullPlayerAndParentChat);
            await Chat.updateMany(
                { _id: { $in: foundTeamsFullChatIDs } },
                {
                    $addToSet: {
                        users: {
                            id: spectatorID,
                            type: 'Spectator',
                            muted: false,
                        },
                    },
                }
            );
        }

        return await changeInObjArray(
            Player,
            'spectators',
            playerID,
            { type, accepted: true },
            Spectator,
            'spectacles',
            spectatorID,
            { type, accepted: true }
        );
    }

    async removeSpectator(playerID: string, spectatorID: string): Promise<boolean | Error> {
        return await handleSpectatorRemoved(playerID, spectatorID);
    }

    async acceptTeam(playerID: string, teamID: string): Promise<boolean | Error> {
        return await handleTeamChatsForParents(teamID, playerID);
    }

    async leaveTeam(playerID: string, teamID: string): Promise<boolean | Error> {
        return await handleTeamChatsForParents(teamID, playerID, false);
    }

    async removeVideo(playerID: string, videoID: string): Promise<boolean | Error> {
        // TODO delete video from S3
        const foundPlayer: any = await Player.findById(playerID);
        if (!foundPlayer) throw new Error('Invalid playerID');
        const foundVideo: any = await Video.findByIdAndDelete(videoID);
        if (!foundVideo) throw new Error('Invalid videoID');
        foundPlayer.videos = foundPlayer.videos.filter(item => item.id.toString() != videoID);
        foundPlayer.save();
        // const videoURL = foundVideo.url;
        const conf = new AWS.Config({
            accessKeyId: 'AKIAQKKHUQYCU27P4RFX',
            secretAccessKey: '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',
            region: 'us-east-1',
        });
        const s3 = new AWS.S3(conf);
        const vidKey = foundVideo.url.split('https://playerwatchtest.s3.amazonaws.com/');
        const params = {
            Bucket: 'playerwatchtest',
            Key: vidKey[1],
        };
        const deleteRes = await s3.deleteObject(params, data => data).promise();
        return deleteRes.DeleteMarker;
    }
}
