/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from "mongoose";
const {
    Types: { ObjectId }
} = mongoose;

export const isIDInvalid = (objectID: string): boolean => {
    return !mongoose.Types.ObjectId.isValid(objectID);
};

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

export const addToStringArray = async (
    collectionOne: mongoose.Model<any>,
    arrayOneName: string,
    idOne: string,
    collectionTwo: mongoose.Model<any>,
    arrayTwoName: string,
    idTwo: string
): Promise<boolean | Error> => {
    if (isIDInvalid(idOne)) return new Error(`Invalid ID: '${idOne}'`);
    if (isIDInvalid(idTwo)) return new Error(`Invalid ID: '${idTwo}'`);
    try {
        // Find the first collection
        const foundOne = await collectionOne.findById(
            idOne,
            err => new Error(err)
        );
        // Find the second collection
        const foundTwo = await collectionTwo.findById(
            idTwo,
            err => new Error(err)
        );
        // If both collections exist
        if (foundOne && foundTwo) {
            // If both arrays exist in the both documents
            if (
                `${arrayOneName}` in foundOne &&
                `${arrayTwoName}` in foundTwo
            ) {
                // If neither array already contains the value
                if (
                    !foundOne[`${arrayOneName}`].includes(idTwo) &&
                    !foundTwo[`${arrayTwoName}`].includes(idOne)
                ) {
                    foundOne[`${arrayOneName}`].push(ObjectId(idTwo));
                    foundTwo[`${arrayTwoName}`].push(ObjectId(idOne));
                    foundOne.save();
                    foundTwo.save();
                    return true;
                    // If either collection's array already has the item, tell them.
                    // TODO maybe return true
                } else
                    return new Error(
                        // eslint-disable-next-line prettier/prettier
                        `'${foundOne[`${arrayOneName}`].toString()}' includes '${idTwo}' or '${foundTwo[`${arrayTwoName}`].toString()}' includes '${idOne}'.`
                    );
                // If either collection has an invalid array name, tell them it's wrong in the backend.
            } else
                return new Error(
                    // eslint-disable-next-line prettier/prettier
                    `'${arrayOneName in foundOne ? arrayTwoName : arrayOneName}' is an invalid array name. This means Adam made a mistake spelling something in the backend.`
                );
            // If both collections don't exist, tell them the invalid ID
        } else {
            return new Error(`Invalid ID: '${foundOne ? idTwo : idOne}'.`);
        }
    } catch (err) {
        return err;
    }
};

export const removeFromStringArray = async (
    collectionOne: mongoose.Model<any>,
    arrayOneName: string,
    idOne: string,
    collectionTwo: mongoose.Model<any>,
    arrayTwoName: string,
    idTwo: string
): Promise<boolean | Error> => {
    if (isIDInvalid(idOne)) return new Error(`Invalid ID: '${idOne}'`);
    if (isIDInvalid(idTwo)) return new Error(`Invalid ID: '${idTwo}'`);
    try {
        // Find the first collection
        const foundOne = await collectionOne.findById(
            idOne,
            err => new Error(err)
        );
        // Find the second collection
        const foundTwo = await collectionTwo.findById(
            idTwo,
            err => new Error(err)
        );
        // If both collections exist
        if (foundOne && foundTwo) {
            // If both arrays exist in the both documents
            if (
                `${arrayOneName}` in foundOne &&
                `${arrayTwoName}` in foundTwo
            ) {
                foundOne[`${arrayOneName}`] = foundOne[
                    `${arrayOneName}`
                ].filter((id: string) => ObjectId(idTwo) == ObjectId(id));
                foundTwo[`${arrayTwoName}`] = foundTwo[
                    `${arrayTwoName}`
                ].filter((id: string) => ObjectId(idOne) == ObjectId(id));
                foundOne.save();
                foundTwo.save();
                return true;
                // If either collection's array already has the item, tell them.
                // TODO maybe return true
                // If either collection has an invalid array name, tell them it's wrong in the backend.
            } else
                return new Error(
                    // eslint-disable-next-line prettier/prettier
                    `'${arrayOneName in foundOne ? arrayTwoName : arrayOneName}' is an invalid array name. This means Adam made a mistake spelling something in the backend.`
                );
            // If both collections don't exist, tell them the invalid ID
        } else {
            return new Error(`Invalid ID: '${foundOne ? idTwo : idOne}'.`);
        }
    } catch (err) {
        return err;
    }
};

export const addToObjArray = async (
    collectionOne: mongoose.Model<any>,
    arrayOneName: string,
    idOne: string,
    objOneInfo: any,
    collectionTwo: mongoose.Model<any>,
    arrayTwoName: string,
    idTwo: string,
    objTwoInfo: any
): Promise<boolean | Error> => {
    if (isIDInvalid(idOne)) return new Error(`Invalid ID: '${idOne}'`);
    if (isIDInvalid(idTwo)) return new Error(`Invalid ID: '${idTwo}'`);
    try {
        // Find the first collection
        const foundOne = await collectionOne.findById(
            idOne,
            err => new Error(err)
        );
        // Find the second collection
        const foundTwo = await collectionTwo.findById(
            idTwo,
            err => new Error(err)
        );
        // If both collections exist
        if (foundOne && foundTwo) {
            // If both arrays exist in the both documents
            if (
                `${arrayOneName}` in foundOne &&
                `${arrayTwoName}` in foundTwo
            ) {
                // If neither array already contains the value
                const isFoundOne = foundOne[`${arrayOneName}`].some(
                    ({ id }: { [key: string]: string }) => id == idTwo
                );
                const isFoundTwo = foundTwo[`${arrayTwoName}`].some(
                    ({ id }: { [key: string]: string }) => id == idOne
                );
                if (!isFoundOne && !isFoundTwo) {
                    const pushOne = { id: ObjectId(idTwo), ...objOneInfo };
                    const pushTwo = { id: ObjectId(idOne), ...objTwoInfo };
                    foundOne[`${arrayOneName}`].push(pushOne);
                    foundTwo[`${arrayTwoName}`].push(pushTwo);
                    foundOne.save();
                    foundTwo.save();
                    return true;
                    // If either collection's array already has the item, tell them.
                    // TODO maybe return true
                } else
                    return new Error(
                        // eslint-disable-next-line prettier/prettier
                        `'${foundOne[`${arrayOneName}`].toString()}' includes '${idTwo}' or '${foundTwo[`${arrayTwoName}`].toString()}' includes '${idOne}'.`
                    );
                // If either collection has an invalid array name, tell them it's wrong in the backend.
            } else
                return new Error(
                    // eslint-disable-next-line prettier/prettier
                    `'${arrayOneName in foundOne ? arrayTwoName : arrayOneName}' is an invalid array name. This means Adam made a mistake spelling something in the backend.`
                );
            // If both collections don't exist, tell them the invalid ID
        } else {
            return new Error(`Invalid ID: '${foundOne ? idTwo : idOne}'.`);
        }
    } catch (err) {
        return err;
    }
};

export const removeFromObjArray = async (
    collectionOne: mongoose.Model<any>,
    arrayOneName: string,
    idOne: string,
    collectionTwo: mongoose.Model<any>,
    arrayTwoName: string,
    idTwo: string
): Promise<boolean | Error> => {
    if (isIDInvalid(idOne)) return new Error(`Invalid ID: '${idOne}'`);
    if (isIDInvalid(idTwo)) return new Error(`Invalid ID: '${idTwo}'`);
    try {
        // Find the first collection
        const foundOne = await collectionOne.findById(
            idOne,
            err => new Error(err)
        );
        // Find the second collection
        const foundTwo = await collectionTwo.findById(
            idTwo,
            err => new Error(err)
        );
        // If both collections exist
        if (foundOne && foundTwo) {
            // If both arrays exist in the both documents
            foundOne[`${arrayOneName}`] = foundOne[`${arrayOneName}`].filter(
                ({ id }: { [key: string]: string }) =>
                    ObjectId(idTwo) == ObjectId(id)
            );
            foundTwo[`${arrayTwoName}`] = foundTwo[`${arrayTwoName}`].filter(
                ({ id }: { [key: string]: string }) =>
                    ObjectId(idOne) == ObjectId(id)
            );
            foundOne.save();
            foundTwo.save();
            return true;
            // If either collection's array already has the item, tell them.
            // TODO maybe return true
            // If either collection has an invalid array name, tell them it's wrong in the backend.
        } else {
            return new Error(`Invalid ID: '${foundOne ? idTwo : idOne}'.`);
        }
    } catch (err) {
        return err;
    }
};

export const changeInObjArray = async (
    collectionOne: mongoose.Model<any>,
    arrayOneName: string,
    idOne: string,
    objOneInfo: any,
    collectionTwo: mongoose.Model<any>,
    arrayTwoName: string,
    idTwo: string,
    objTwoInfo: any
): Promise<boolean | Error> => {
    if (isIDInvalid(idOne)) return new Error(`Invalid ID: '${idOne}'`);
    if (isIDInvalid(idTwo)) return new Error(`Invalid ID: '${idTwo}'`);
    try {
        // Find the first collection
        const foundOne = await collectionOne.findById(
            idOne,
            err => new Error(err)
        );
        // Find the second collection
        const foundTwo = await collectionTwo.findById(
            idTwo,
            err => new Error(err)
        );
        // If both collections exist
        if (foundOne && foundTwo) {
            // If neither array already contains the value
            const isFoundOne = foundOne[`${arrayOneName}`].findIndex(
                ({ id }: { [key: string]: any }) => id.toString() == idTwo
            );
            const isFoundTwo = foundTwo[`${arrayTwoName}`].findIndex(
                ({ id }: { [key: string]: any }) => id.toString() === idOne
            );

            // If both arrays exist in the both documents
            if (isFoundOne > -1 && isFoundTwo > -1) {
                Object.entries(objOneInfo).forEach(entry => {
                    const key = entry[0];
                    const value = entry[1];
                    foundOne[`${arrayOneName}`][isFoundOne][`${key}`] = value;
                });
                Object.entries(objTwoInfo).forEach(entry => {
                    const key = entry[0];
                    const value = entry[1];
                    foundTwo[`${arrayTwoName}`][isFoundTwo][`${key}`] = value;
                });
                foundOne.save();
                foundTwo.save();
                return true;
                // If either collection's array already has the item, tell them.
                // TODO maybe return true
                // If either collection has an invalid array name, tell them it's wrong in the backend.
            } else
                return new Error(
                    // eslint-disable-next-line prettier/prettier
                    `'${arrayOneName in foundOne ? arrayTwoName : arrayOneName}' is an invalid array name. This means Adam made a mistake spelling something in the backend.`
                );
            // If both collections don't exist, tell them the invalid ID
        } else {
            return new Error(`Invalid ID: '${foundOne ? idTwo : idOne}'.`);
        }
    } catch (err) {
        return err;
    }
};
