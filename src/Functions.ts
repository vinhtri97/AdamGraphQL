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
    // console.log(referencedDBName);
    // console.log(arrayName);
    // console.log(nestedIDName);
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
    // console.log(array);
    if (array.length > 0 && "models" in array[0]) {
        return array[0].models;
    } else return [];
};
