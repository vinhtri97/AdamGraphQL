/* eslint-disable @typescript-eslint/no-explicit-any */
// const Player = require("./models/player/players");
// const User = require("./models/user/user");

import * as mongoose from "mongoose";
const {
    Types: { ObjectId }
} = mongoose;

// import PlayerDto from "./Users/Player/dto/player.dto";
// import CoachDto from "./Users/Coach/dto/coach.dto";

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
                foreignField: "_id",
                as: "models"
            }
        }
    ]);
    if (array.length > 0 && "models" in array[0]) {
        return array[0].models;
    } else return [];
};

/*
*await Player.aggregate([
            { $match: { _id: ObjectId(playerID) } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "coaches",
                    localField: "favorites",
                    foreignField: "_id",
                    as: "Anything"
                }
            }
        ]);
*/

export const addBasicLink = async (
    collection: mongoose.Model<any>,
    findID: string,
    linkID: string,
    arrayName: string
): Promise<Array<mongoose.Model<any>>> => {
    return await collection.findByIdAndUpdate(findID, {
        $addToSet: { [`${arrayName}`]: linkID }
    });
};

// async addLinkBasicString(collection, findID, linkID, array) {
//     return await collection
//         .findOneAndUpdate(
//             { _id: findID },
//             { $addToSet: { [`${array}`]: linkID } },
//             { useFindAndModify: false, new: true }
//         )
//         .exec();
// }
