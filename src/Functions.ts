/* eslint-disable @typescript-eslint/no-explicit-any */
// const Player = require("./models/player/players");
// const User = require("./models/user/user");
import { PatchPlayerInput } from "./Users/Player/inputs/index";

import * as mongoose from "mongoose";

export const extendSchema = (
    Schema: mongoose.Schema,
    definition: any,
    options?: any
): mongoose.Schema => {
    return new mongoose.Schema(
        Object.assign({}, Schema.obj, definition),
        options
    );
};

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

export const patchDocument = async (
    collection: mongoose.Model<any>,
    args: PatchPlayerInput
): Promise<boolean | Error> => {
    const inputWithoutID = { ...args };
    delete inputWithoutID.id;
    try {
        // await Player.findByIdAndUpdate(input.id, { $set: inputWithoutID });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundDoc: any = await collection.findById(args.id).limit(1);
        // For each entry...
        // thumbnail, email, personal...
        if (foundDoc) {
            Object.entries(inputWithoutID).forEach(entry => {
                const value = entry[1];
                const key = entry[0];
                // This means that there is nesting! Example: (personal { first_name })
                if (typeof value === "object" && value !== null) {
                    Object.entries(value).forEach(subEntry => {
                        const subValue = subEntry[1];
                        const subKey = subEntry[0];
                        foundDoc[key][subKey] = subValue;
                    });
                } else {
                    foundDoc[key] = value;
                }
            });
            foundDoc.save();
            return true;
        } else return new Error("Player not found.");
    } catch (err) {
        if (err.kind === "ObjectId") return new Error("Invalid ObjectID.");
        else return err;
    }
};
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

/**
 * @description This function will accept an invitation
 * @param collection
 * @param findID
 * @param linkID
 * @param arrayName
 */
export const acceptInvitation = async (
    collection: mongoose.Model<any>,
    findID: string,
    linkID: string,
    arrayName: string
): Promise<boolean> => {
    const foundCollection = await collection
        .findByIdAndUpdate(
            { findID, [`${arrayName}.id`]: linkID },
            { $set: { [`${arrayName}.$.accepted`]: true } }
        )
        .limit(1);
    return foundCollection ? true : false;
};

export const sendInvitation = async (
    collection: mongoose.Model<any>,
    findID: string,
    linkID: string,
    arrayName: string
): Promise<boolean> => {
    const foundCollection = await collection
        .findByIdAndUpdate(findID, {
            $addToSet: { [`${arrayName}`]: { id: linkID, accepted: false } }
        })
        .limit(1);
    return foundCollection ? true : false;
};
