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
    arrayName: string
): Promise<Array<any>> => {
    const array = await collection.aggregate([
        { $match: { _id: ObjectId(userID) } },
        { $limit: 1 },
        {
            $lookup: {
                from: `${referencedDBName}`,
                localField: `${arrayName}.id`,
                foreignField: "_id",
                as: "models"
            }
        }
    ]);
    if (array.length > 0 && "models" in array[0]) {
        return array[0].models;
    } else return [];
};

export const wrapTry = async (func: any): Promise<Error | any> => {
    try {
        return await func();
    } catch (err) {
        if (err.kind === "ObjectId") return new Error("Invalid ObjectID.");
        else return err;
    }
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

export const updateDocument = async (
    collection: mongoose.Model<any>,
    args: any
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
        } else return new Error("Cannot find collection with that ID.");
    } catch (err) {
        if (err.kind === "ObjectId") return new Error("Invalid ObjectID.");
        else return err;
    }
};

// class MyInput {
//     collection: mongoose.Model<any>;
//     arrayToUpdate: string;
// }

export const addLinkTest = async (
    collection: mongoose.Model<any>,
    arrayToUpdate: string,
    findID: string,
    linkID: string
): Promise<boolean | Error> => {
    async function doThing(): Promise<mongoose.Model<any> | Error> {
        return await collection.findByIdAndUpdate(findID, {
            $addToSet: { [`${arrayToUpdate}`]: ObjectId(linkID) }
        });
    }
    return await wrapTry(doThing);
    // try {
    //     // Get the inputs
    //     const foundCollectionOne = await collection.findByIdAndUpdate(findID, {
    //         $addToSet: { [`${arrayToUpdate}`]: ObjectId(linkID) }
    //     });
    //     if (foundCollectionOne) return true;/
    //     else return new Error("Cannot find collection with that ID");
    // } catch (err) {
    //     if (err.kind === "ObjectId") return new Error("Invalid ObjectID.");
    //     else return err;
    // }
};

export const addLinkFunction = async (
    myInputOne: {
        collection: mongoose.Model<any>;
        arrayToUpdate: string;
        id: string;
    },
    myInputTwo: {
        collection: mongoose.Model<any>;
        arrayToUpdate: string;
        id: string;
    }
): Promise<boolean | Error> => {
    try {
        // Get the inputs
        const {
            collection: collectionOne,
            arrayToUpdate: collectionOneArrayName,
            id: findID
        } = myInputOne;
        const {
            collection: collectionTwo,
            arrayToUpdate: collectionTwoArrayName,
            id: linkID
        } = myInputTwo;
        // Put the first link
        const foundCollectionOne = await collectionOne.findByIdAndUpdate(
            findID,
            {
                $addToSet: { [`${collectionOneArrayName}`]: ObjectId(linkID) }
            }
        );
        // Put the 2nd link
        const foundCollectionTwo = await collectionTwo.findByIdAndUpdate(
            linkID,
            {
                $addToSet: { [`${collectionTwoArrayName}`]: ObjectId(findID) }
            }
        );
        if (foundCollectionOne && foundCollectionTwo) return true;
        else return new Error("Cannot find collection with that ID");
    } catch (err) {
        if (err.kind === "ObjectId") return new Error("Invalid ObjectID.");
        else return err;
    }
};

// /**
//  * @description This function will accept an invitation
//  * @param collection
//  * @param findID
//  * @param linkID
//  * @param arrayName
//  */
// export const acceptInvitation = async (
//     collection: mongoose.Model<any>,
//     findID: string,
//     linkID: string,
//     arrayName: string
// ): Promise<boolean> => {
//     const foundCollection = await collection
//         .findByIdAndUpdate(
//             { findID, [`${arrayName}.id`]: linkID },
//             { $set: { [`${arrayName}.$.accepted`]: true } }
//         )
//         .limit(1);
//     return foundCollection ? true : false;
// };

// export const sendInvitation = async (
//     collection: mongoose.Model<any>,
//     findID: string,
//     linkID: string,
//     arrayName: string
// ): Promise<boolean> => {
//     const foundCollection = await collection
//         .findByIdAndUpdate(findID, {
//             $addToSet: { [`${arrayName}`]: { id: linkID, accepted: false } }
//         })
//         .limit(1);
//     return foundCollection ? true : false;
// };
