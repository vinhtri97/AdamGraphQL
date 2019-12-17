/* eslint-disable @typescript-eslint/no-explicit-any */
import Spectator from "../schema/Spectator.schema";
import Player from "../../Player/schema/Player.schema";
import {
    CreateSpectatorInput,
    UpdateSpectatorInput
} from "../dto/classes/index";
import {
    addToObjArray,
    removeFromObjArray,
    changeInObjArray
} from "../../../MongooseFunctions";
import { updateDocument } from "../../../MongooseFunctions";
// import * as mongoose from "mongoose";

export class SpectatorMutationService {
    async createSpectator(input: CreateSpectatorInput): Promise<string> {
        const spectator = await Spectator.create(input);
        return spectator._id;
    }
    // async createSpectator()

    async updateSpectator(input: UpdateSpectatorInput): Promise<string> {
        await updateDocument(Spectator, input);
        return "Test";
    }

    async addSpectacle(
        spectatorID: string,
        playerID: string
    ): Promise<boolean | Error> {
        return await addToObjArray(
            Player,
            "spectators",
            playerID,
            { accepted: false, type: "Spectator" },
            Spectator,
            "spectacles",
            spectatorID,
            { accepted: false, type: "Spectator" }
        );
    }

    async removeSpectacle(
        spectatorID: string,
        playerID: string
    ): Promise<boolean | Error> {
        return await removeFromObjArray(
            Player,
            "spectators",
            playerID,
            Spectator,
            "spectacles",
            spectatorID
        );
    }

    async changeType(
        spectatorID: string,
        playerID: string,
        type: string
    ): Promise<boolean | Error> {
        return await changeInObjArray(
            Player,
            "spectators",
            playerID,
            { type, accepted: true },
            Spectator,
            "spectacles",
            spectatorID,
            { type, accepted: true }
        );
    }
}
