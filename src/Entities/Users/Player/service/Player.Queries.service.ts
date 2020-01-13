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
        const selections = info.fieldNodes[0].selectionSet.selections.map(({ name: { value } }) => value);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const createLookupObj = (fromDB: string, localArrayName: string, isNested = true) => {
            const localField = isNested ? `${localArrayName}.id` : `${localArrayName}`;
            return {
                $lookup: {
                    from: `${fromDB}`,
                    localField,
                    foreignField: '_id',
                    as: `${localArrayName}2`,
                },
            };
        };
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const createStatLookup = (fromDB: string, localArrayName: string) => {
            return {
                $lookup: {
                    from: `${fromDB}`,
                    localField: `statistics.${localArrayName}`,
                    foreignField: '_id',
                    as: `${localArrayName}2`,
                },
            };
        };
        const returnStatistics = selections.includes('statistics');
        // These are links to other db's that we are checking for in the user's query
        const booleans = {
            teams: false,
            spectators: false,
            videos: false,
            favorites: false,
        };
        // These are links to other db's that we are checking for in the user's query for stats
        const statBooleans = {
            academics: false,
            agility: false,
            baseball: false,
            basketball: false,
            physical: false,
            power: false,
            soccer: false,
            tennis: false,
            volleyball: false,
        };
        if (returnStatistics) {
            // Get all of the selections inside statistics
            const statsSelections: string[] = info.fieldNodes[0].selectionSet.selections
                .find(({ name: { value } }) => value == 'statistics')
                .selectionSet.selections.map(({ name: { value } }) => value);
            // Correctly set whether the user is querying
            Object.keys(statBooleans).forEach(key => (statBooleans[key] = statsSelections.includes(`${key}`)));
        }
        // Correctly set whether the user is querying
        Object.keys(booleans).forEach(key => (booleans[key] = selections.includes(`${key}`)));
        // This is the aggregation array but has two arrays
        const testArray = [
            { $match: { _id: ObjectId(playerID) } },
            { $limit: 1 },
            Object.entries(booleans).map(pair => {
                const key = pair[0];
                const boolean = pair[1];
                if (boolean) {
                    if (key == 'favorites') return createLookupObj(`coaches`, `${key}`, false);
                    else return createLookupObj(`${key}`, `${key}`);
                }
                return null;
            }),
            selections.includes('statistics')
                ? Object.entries(statBooleans).map(pair => {
                      const key = pair[0];
                      const boolean = pair[1];
                      let db = key;
                      if (boolean) {
                          // TODO all stats db names
                          if (key.charAt(key.length - 1) != 's') db = key + 's';
                          return createStatLookup(`${db}`, `${key}`);
                      }
                      return null;
                  })
                : null,
        ];
        // Correctly formatted aggregation array
        const aggArray = [].concat(...testArray).filter(item => item != null);
        // If the user is querying anything that requires aggregation ,perform lookup
        let myReturn;
        if (aggArray.length > 2) {
            // Gets the items that are pending or accepted in a very efficient way (removing from the array every time one is found)
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
            // Sets the pending and accepted return
            const getPendingOrAccepted = (filterArray: any[], playerArray: any[]): any => {
                return {
                    pending: getAccepted(filterArray, playerArray, false),
                    accepted: getAccepted(filterArray, playerArray),
                };
            };
            // Gets the types of the spectator
            const getSpectatorType = (foundArray: any[], playerArray: any[]): GetSpectatorsDto => {
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
            // This is the user with all of the extra found fields
            const expandedUser = (myReturn = (await Player.aggregate(aggArray))[0]);
            // For every true query, set the return to the correct thing
            Object.entries(booleans).forEach(pair => {
                const key = pair[0];
                const boolean = pair[1];
                if (boolean) {
                    if (key == 'favorites') myReturn[key] = expandedUser[`${key}2`];
                    else if (key == 'spectators')
                        myReturn[key] = getSpectatorType(expandedUser[`${key}2`], expandedUser[key]);
                    else myReturn[key] = getPendingOrAccepted(expandedUser[`${key}2`], expandedUser[key]);
                }
            });
            if (returnStatistics)
                // For every true stat, set the retur nto the correct thing
                Object.entries(statBooleans).forEach(pair => {
                    const key = pair[0];
                    const boolean = pair[1];
                    if (boolean) {
                        myReturn.statistics[key] = expandedUser[`${key}2`];
                    }
                });
        } else myReturn = await Player.findById(playerID).lean();

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
