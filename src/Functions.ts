import * as mongoose from 'mongoose';

import Chat from './Entities/Non-Users/Chat/schema/Chat.schema';
import Team from './Entities/Non-Users/Team/schema/Team.schema';
import Player from './Entities/Users/Player/schema/Player.schema';
import Spectator from './Entities/Users/Spectator/schema/Spectator.schema';
import { getCollection } from './MongooseFunctions';

/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-explicit-any */
const {
    Types: { ObjectId },
} = mongoose;

export const getObjects = async (
    collection: mongoose.Model<any>,
    userID: string,
    referencedDBName: string,
    arrayName: string
): Promise<Array<any>> => {
    const array = await collection.aggregate([
        { $match: { _id: ObjectId(userID) } },
        { $limit: 1 },
        {
            $lookup: {
                from: `${referencedDBName}`,
                localField: `${arrayName}`,
                foreignField: '_id',
                as: 'models',
            },
        },
    ]);
    if (array.length > 0 && 'models' in array[0]) {
        return array[0].models;
    } else return [];
};

export const getNestedObjects = async (
    collection: mongoose.Model<any>,
    userID: string,
    referencedDBName: string,
    arrayName: string,
    nestedIDName = 'id'
): Promise<Array<any>> => {
    const array = await collection.aggregate([
        { $match: { _id: ObjectId(userID) } },
        { $limit: 1 },
        {
            $lookup: {
                from: `${referencedDBName}`,
                localField: `${arrayName}.${nestedIDName}`,
                foreignField: '_id',
                as: 'models',
            },
        },
    ]);

    if (array.length > 0 && 'models' in array[0]) return array[0].models;
    else return [];
};

class TrueFalseReturn {
    pending: Array<any>;
    accepted: Array<any>;
}
export const getNestedTrueFalseObjects = async (
    collection: mongoose.Model<any>,
    userID: string,
    referencedDBName: string,
    arrayName: string,
    nestedIDName = 'id'
): Promise<TrueFalseReturn> => {
    // console.log(referencedDBName);
    // console.log(arrayName);
    // console.log(nestedIDName);
    const array = await collection.aggregate([
        { $match: { _id: ObjectId(userID) } },
        { $limit: 1 },
        { $unwind: `$${arrayName}` },
        {
            $lookup: {
                from: `${referencedDBName}`,
                localField: `${arrayName}.${nestedIDName}`,
                foreignField: '_id',
                as: 'models',
            },
        },
        { $unwind: '$models' },
        {
            $group: {
                _id: '$_id',
                pending: {
                    $push: {
                        $cond: [{ $eq: [`$${arrayName}.accepted`, false] }, '$models', null],
                    },
                },
                accepted: {
                    $push: {
                        $cond: [{ $eq: [`$${arrayName}.accepted`, true] }, '$models', null],
                    },
                },
            },
        },
    ]);

    if (array.length > 0 && 'pending' in array[0]) {
        array[0].pending = array[0].pending.filter((item: any) => item != null);
        array[0].accepted = array[0].accepted.filter((item: any) => item != null);
        return array[0];
    } else return { pending: [], accepted: [] };
};

class SpectatorReturn {
    pending: Array<any>;
    Mom: Array<any>;
    Dad: Array<any>;
    Guardian: Array<any>;
    Spectator: Array<any>;
}
export const getNestedSpectatorObjects = async (
    collection: mongoose.Model<any>,
    userID: string,
    referencedDBName: string,
    arrayName: string,
    nestedIDName = 'id'
): Promise<SpectatorReturn> => {
    // console.log(referencedDBName);
    // console.log(arrayName);
    // console.log(nestedIDName);
    const array = await collection.aggregate([
        { $match: { _id: ObjectId(userID) } },
        { $limit: 1 },
        { $unwind: `$${arrayName}` },
        {
            $lookup: {
                from: `${referencedDBName}`,
                localField: `${arrayName}.${nestedIDName}`,
                foreignField: '_id',
                as: 'models',
            },
        },
        { $unwind: '$models' },
        {
            $group: {
                _id: '$_id',
                pending: {
                    $push: {
                        $cond: [{ $eq: [`$${arrayName}.accepted`, false] }, '$models', null],
                    },
                },
                Mom: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    { $eq: [`$${arrayName}.type`, 'Mom'] },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true],
                                    },
                                ],
                            },
                            '$models',
                            null,
                        ],
                    },
                },
                Dad: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    { $eq: [`$${arrayName}.type`, 'Dad'] },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true],
                                    },
                                ],
                            },
                            '$models',
                            null,
                        ],
                    },
                },
                Guardian: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: [`$${arrayName}.type`, 'Guardian'],
                                    },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true],
                                    },
                                ],
                            },
                            '$models',
                            null,
                        ],
                    },
                },
                Spectator: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: [`$${arrayName}.type`, 'Spectator'],
                                    },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true],
                                    },
                                ],
                            },
                            '$models',
                            null,
                        ],
                    },
                },
            },
        },
    ]);
    console.log(array);
    if (array.length > 0 && 'Mom' in array[0]) {
        array[0].pending = array[0].pending.filter((item: any) => item != null);
        array[0].Mom = array[0].Mom.filter((item: any) => item != null);
        array[0].Dad = array[0].Dad.filter((item: any) => item != null);
        array[0].Guardian = array[0].Guardian.filter((item: any) => item != null);
        array[0].Spectator = array[0].Spectator.filter((item: any) => item != null);
        return array[0];
    } else
        return {
            pending: [],
            Mom: [],
            Dad: [],
            Guardian: [],
            Spectator: [],
        };
};

export const handleTeamChatsForParents = async (teamID: string, playerID: string, add = true): Promise<boolean> => {
    function handleArray(myArray: any, userID: string, pushObj: any): any[] {
        if (add) {
            const myReturn = [...myArray];
            const isAlreadyIn = myArray.some(({ id }: { [key: string]: string }) => id.toString() == userID);
            if (!isAlreadyIn) {
                myReturn.push(pushObj);
            }
            return myReturn;
        } else {
            return myArray.filter((item: any) => item.id.toString() != userID);
        }
    }
    function setAccepted(myArray: any, userID: string, pushObj: any): any[] {
        if (add) {
            const myReturn = [...myArray];
            const foundIndex = myArray.findIndex(({ id }: { [key: string]: string }) => id.toString() == userID);
            if (foundIndex > -1) {
                myReturn[foundIndex] = pushObj;
            }
            return myReturn;
        } else {
            return myArray.filter((item: any) => item.id.toString() != userID);
        }
    }
    async function parentsToAdd(spectatorArray: any[], fullChatUserArray: any[]): Promise<any[]> {
        //Get accepted parent objects
        const acceptedParents = spectatorArray.filter(
            ({ accepted, type }: { accepted: boolean; type: string }) => accepted && type != 'Spectator'
        );

        // Get parents not already in the chat
        const filteredAcceptedParentsIDs = acceptedParents.filter(
            (smallSpect: any) =>
                !fullChatUserArray.some(
                    ({ id: chatUserID }: { id: string }) => smallSpect.id.toString() == chatUserID.toString()
                )
        );
        // Find the objects to make sure they exist
        const foundSpectators = await Spectator.find({
            _id: {
                $in: filteredAcceptedParentsIDs.map((smallObj: any) => ObjectId(smallObj.id)),
            },
        });
        // Format the objects to be put into the full chat
        return foundSpectators.map(({ _id }: { _id: string }) => ({
            id: ObjectId(_id),
            type: 'Spectator',
            muted: false,
        }));
    }
    async function parentsToRemove(spectatorArray: any[], fullChatUserArray: any[]): Promise<any[]> {
        const foundSpectators = await Spectator.find({
            _id: {
                $in: spectatorArray.map((smallObj: any) => ObjectId(smallObj.id)),
            },
        });
        return foundSpectators.filter((spectatorObj: any) => {
            return spectatorObj.spectacles.some((spectacle: any) => {
                return fullChatUserArray.some((userObj: any) => {
                    return spectacle.id.toString() != userObj.id.toString();
                });
            });
        });
    }
    const foundTeam: any = await Team.findById(teamID).limit(1);

    const foundPlayer: any = await Player.findById(playerID).limit(1);
    const foundPlayerChat: any = await Chat.findById(ObjectId(foundTeam.fullPlayerChat)).limit(1);
    const foundFullChat: any = await Chat.findById(ObjectId(foundTeam.fullPlayerAndParentChat)).limit(1);

    foundPlayerChat.users = handleArray(foundPlayerChat.users, playerID, {
        id: ObjectId(playerID),
        type: 'Player',
        muted: false,
    });
    foundPlayerChat.save();

    foundPlayer.teams = setAccepted(foundPlayer.teams, foundTeam._id, {
        id: ObjectId(foundTeam._id),
        accepted: true,
    });
    foundPlayer.save();

    foundTeam.players = setAccepted(foundTeam.players, playerID, {
        id: ObjectId(playerID),
        accepted: true,
    });
    foundTeam.save();

    foundFullChat.users = handleArray(foundFullChat.users, playerID, {
        id: ObjectId(playerID),
        type: 'Player',
        muted: false,
    });

    if (add) {
        const formattedParents = await parentsToAdd(foundPlayer.spectators, foundFullChat.users);
        // Put the parents into the full chat
        foundFullChat.users = foundFullChat.users.concat(formattedParents);
    } else {
        // For every parent of the player leaving:
        // -> For each of that parents' children
        // -> -> check if the child is in the chat
        // -> -> -> yes: don't remove the parent (do nothing)
        // -> -> -> no: remove the parent
        const parentsToRemoveArray = await parentsToRemove(foundPlayer.spectators, foundFullChat.users);
        const parentsToRemoveIDs = parentsToRemoveArray.map((item: any) => item.id);
        foundFullChat.users = foundFullChat.users.filter(
            (userObj: any) => !parentsToRemoveIDs.includes(userObj.id.toString())
        );
    }
    foundFullChat.save();

    return true;
};

export const handleSpectatorRemoved = async (playerID: string, spectatorID: string): Promise<boolean | Error> => {
    const foundPlayer: any = await getCollection(Player, playerID);
    const foundSpectator: any = await getCollection(Spectator, spectatorID);

    const spectatorIndex = foundPlayer.spectators.findIndex(
        (spectatorObj: any) => spectatorObj.id.toString() == spectatorID
    );
    //console.log("spectatorIndex", spectatorIndex);
    if (spectatorIndex > -1) {
        // remove the spectator from the Player's 'spectators'
        foundPlayer.spectators.splice(spectatorIndex, 1);
        const playerIndex = foundSpectator.spectacles.findIndex(
            (playerObj: any) => playerObj.id.toString() == playerID
        );
        //console.log("playerIndex", playerIndex);
        const isParent = foundSpectator.spectacles[playerIndex].type != 'Spectator';
        //console.log("isParent", isParent);
        if (playerIndex > -1) {
            // remove the player from the Spectator's 'spectacles'
            foundSpectator.spectacles.splice(playerIndex, 1);
        }
        //console.log("foundSpectator.spectacles", foundSpectator.spectacles);
        if (isParent) {
            const acceptedPlayerTeams = foundPlayer.teams.filter((teamObj: any) => teamObj.accepted);
            //console.log("acceptedPlayerTeams", acceptedPlayerTeams);
            const acceptedTeamIDs = acceptedPlayerTeams.map((teamObj: any) => teamObj.id.toString());
            //console.log("acceptedTeamIDs", acceptedTeamIDs);
            if (acceptedTeamIDs.length > 0) {
                const playerTeams: any = await Team.find({
                    _id: { $in: acceptedTeamIDs },
                });
                //console.log("playerTeams", playerTeams);
                const spectaclesIDs = foundSpectator.spectacles
                    .filter((spectacleObj: any) => spectacleObj.accepted)
                    .map((spectacleObj: any) => {
                        return spectacleObj.id.toString();
                    });
                //console.log("spectaclesIDs", spectaclesIDs);
                await Promise.all(
                    playerTeams.map(async (team: any) => {
                        const hasChildren = team.players.some((player: any) =>
                            spectaclesIDs.includes(player.id.toString())
                        );
                        //console.log("hasChildren", hasChildren);
                        if (!hasChildren) {
                            const foundChat: any = await Chat.findById(team.fullPlayerAndParentChat);
                            //console.log("foundChat.users", foundChat.users);
                            foundChat.users = foundChat.users.filter((user: any) => {
                                return user.id.toString() != foundSpectator._id.toString();
                            });
                            //console.log("foundChat.users", foundChat.users);
                            foundChat.save();
                        }
                    })
                );
            }
        }
    }
    //console.log("foundPlayer.spectators", foundPlayer.spectators);
    //console.log("foundSpectator.spectacles", foundSpectator.spectacles);

    foundPlayer.save();
    foundSpectator.save();
    return true;
};
