/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';

import { getNestedSpectatorObjects, getNestedTrueFalseObjects, getObjects } from '../../../../Functions';
import CoachDto from '../../Coach/dto/Coach.dto';
import { GetSpectatorsDto, GetTeamsDto } from '../dto/classes';
import { GetVideosDto } from '../dto/classes/Player.GetVideos';
import ExpandablePlayerDto from '../dto/ExpandablePlayer.dto';
import PlayerDto from '../dto/Player.dto';
import Player from '../schema/Player.schema';

const {
    Types: { ObjectId },
} = mongoose;
/* eslint-disable @typescript-eslint/no-explicit-any */
export class PlayerQueryService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }

    async getPlayer(playerID: string, info: any): Promise<ExpandablePlayerDto> {
        const foundPlayer = await Player.findById(playerID).lean();
        if (!foundPlayer) throw new Error('Invalid playerID');
        const myReturn = foundPlayer;
        const selections = info.fieldNodes[0].selectionSet.selections.map(({ name: { value } }) => value);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const createLookupObj = (fromDB: string, localArrayName: string, isNested = true) => {
            return {
                $lookup: {
                    from: `${fromDB}`,
                    localField: isNested ? `${localArrayName}.id` : `${localArrayName}`,
                    foreignField: '_id',
                    as: `${localArrayName}2`,
                },
            };
        };

        const returnTeams = selections.includes('teams');
        const returnSpectators = selections.includes('spectators');
        const returnVideos = selections.includes('videos');
        const returnCoaches = selections.includes('favorites');
        let aggArray = [
            { $match: { _id: ObjectId(playerID) } },
            { $limit: 1 },
            returnTeams ? createLookupObj('teams', 'teams') : null,
            returnSpectators ? createLookupObj('spectators', 'spectators') : null,
            returnVideos ? createLookupObj('videos', 'videos') : null,
            returnCoaches ? createLookupObj('coaches', 'favorites', false) : null,
        ];
        aggArray = aggArray.filter(item => item != null);
        if (aggArray.length > 2) {
            const getAccepted = (filterArray: any[], playerArray: any[], isPending = true): Array<any> => {
                return filterArray.filter((arrayItem, index) =>
                    playerArray.some(playerItem => {
                        if (arrayItem._id.toString() == playerItem.id.toString() && playerItem.accepted == isPending) {
                            filterArray.splice(index, 1);
                            return true;
                        }
                        return false;
                    })
                );
            };
            const getPendingOrAccepted = (filterArray: any[], playerArray: any[]): any => {
                return {
                    pending: getAccepted(filterArray, playerArray, false),
                    accepted: getAccepted(filterArray, playerArray),
                };
            };
            const getSpectatorType = (foundArray: any[], playerArray: any[]): GetSpectatorsDto => {
                // const pendingArray = getPendingOrAccepted(foundArray, playerArray);
                const pendingArray = getAccepted(foundArray, playerArray, false);
                const returnSpectType = (type: 'Dad' | 'Mom' | 'Guardian' | 'Spectator'): Array<any> => {
                    if (foundArray.length == 0) return [];
                    return foundArray.filter((foundSpect, index) =>
                        playerArray.some(spect => {
                            if (foundSpect._id.toString() == spect.id.toString() && spect.type == type) {
                                foundArray.splice(index, 1);
                                return true;
                            }
                            return false;
                        })
                    );
                };

                return {
                    accepted: {
                        Dad: returnSpectType('Dad'),
                        Mom: returnSpectType('Mom'),
                        Guardian: returnSpectType('Guardian'),
                        Spectator: returnSpectType('Spectator'),
                    },
                    pending: pendingArray,
                };
            };
            const expandedUser = (await Player.aggregate(aggArray))[0];
            if (returnTeams) myReturn.teams = getPendingOrAccepted(expandedUser.teams2, foundPlayer.teams);
            if (returnSpectators)
                myReturn.spectators = getSpectatorType(expandedUser.spectators2, foundPlayer.spectators);
            if (returnVideos) myReturn.videos = getPendingOrAccepted(expandedUser.videos2, foundPlayer.videos);
            if (returnCoaches) myReturn.favorites = expandedUser.favorites2;
        }

        return myReturn;
    }

    async getFavorites(playerID: string): Promise<Array<CoachDto>> {
        return await getObjects(Player, playerID, 'coaches', 'favorites');
    }

    async getTeams(playerID: string): Promise<GetTeamsDto> {
        return await getNestedTrueFalseObjects(Player, playerID, 'teams', 'teams');
    }

    async getVideos(playerID: string): Promise<GetVideosDto> {
        return await getNestedTrueFalseObjects(Player, playerID, 'videos', 'videos');
    }

    async getSpectators(playerID: string): Promise<GetSpectatorsDto> {
        const obj = await getNestedSpectatorObjects(Player, playerID, 'spectators', 'spectators');
        const { pending, ...rest } = obj;
        const returnObj = {
            pending,
            accepted: { ...rest },
        };
        return returnObj;
    }
}
