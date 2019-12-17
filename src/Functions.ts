/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from "mongoose";
const {
    Types: { ObjectId }
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
                foreignField: "_id",
                as: "models"
            }
        }
    ]);
    if (array.length > 0 && "models" in array[0]) {
        return array[0].models;
    } else return [];
};

export const getNestedObjects = async (
    collection: mongoose.Model<any>,
    userID: string,
    referencedDBName: string,
    arrayName: string,
    nestedIDName = "id"
): Promise<Array<any>> => {
    const array = await collection.aggregate([
        { $match: { _id: ObjectId(userID) } },
        { $limit: 1 },
        {
            $lookup: {
                from: `${referencedDBName}`,
                localField: `${arrayName}.${nestedIDName}`,
                foreignField: "_id",
                as: "models"
            }
        }
    ]);

    if (array.length > 0) return array;
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
    nestedIDName = "id"
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
                foreignField: "_id",
                as: "models"
            }
        },
        { $unwind: "$models" },
        {
            $group: {
                _id: "$_id",
                pending: {
                    $push: {
                        $cond: [
                            { $eq: [`$${arrayName}.accepted`, false] },
                            "$models",
                            null
                        ]
                    }
                },
                accepted: {
                    $push: {
                        $cond: [
                            { $eq: [`$${arrayName}.accepted`, true] },
                            "$models",
                            null
                        ]
                    }
                }
            }
        }
    ]);

    if (array.length > 0 && "pending" in array[0]) return array[0];
    else return { pending: [], accepted: [] };
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
    nestedIDName = "id"
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
                foreignField: "_id",
                as: "models"
            }
        },
        { $unwind: "$models" },
        {
            $group: {
                _id: "$_id",
                pending: {
                    $push: {
                        $cond: [
                            { $eq: [`$${arrayName}.accepted`, false] },
                            "$models",
                            null
                        ]
                    }
                },
                Mom: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    { $eq: [`$${arrayName}.type`, "Mom"] },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true]
                                    }
                                ]
                            },
                            "$models",
                            null
                        ]
                    }
                },
                Dad: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    { $eq: [`$${arrayName}.type`, "Dad"] },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true]
                                    }
                                ]
                            },
                            "$models",
                            null
                        ]
                    }
                },
                Guardian: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: [`$${arrayName}.type`, "Guardian"]
                                    },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true]
                                    }
                                ]
                            },
                            "$models",
                            null
                        ]
                    }
                },
                Spectator: {
                    $push: {
                        $cond: [
                            {
                                $and: [
                                    {
                                        $eq: [`$${arrayName}.type`, "Spectator"]
                                    },
                                    {
                                        $eq: [`$${arrayName}.accepted`, true]
                                    }
                                ]
                            },
                            "$models",
                            null
                        ]
                    }
                }
            }
        }
    ]);
    console.log(array);
    if (array.length > 0 && "Mom" in array[0]) {
        return array[0];
    } else
        return {
            pending: [],
            Mom: [],
            Dad: [],
            Guardian: [],
            Spectator: []
        };
};
