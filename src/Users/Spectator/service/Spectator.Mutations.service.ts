/* eslint-disable @typescript-eslint/no-explicit-any */
import Spectator from "../schema/Spectator.schema";
import Player from "../../Player/schema/Player.schema";
import {
    CreateSpectatorInput,
    UpdateSpectatorInput
} from "../dto/classes/index";
import { addToObjArray, changeInObjArray } from "../../../MongooseFunctions";
import { handleSpectatorRemoved } from "../../../Functions";
import { updateDocument } from "../../../MongooseFunctions";
// import * as mongoose from "mongoose";

export class SpectatorMutationService {
    async createSpectator(
        input: CreateSpectatorInput
    ): Promise<boolean | Error> {
        await Spectator.create(input);
        return true;
    }
    // async createSpectator()

    async updateSpectator(
        input: UpdateSpectatorInput
    ): Promise<boolean | Error> {
        return await updateDocument(Spectator, input);
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
        return await handleSpectatorRemoved(playerID, spectatorID);
    }

    async changeType(
        spectatorID: string,
        playerID: string,
        type: string
    ): Promise<boolean | Error> {
        // TODO remove spectator from full chat
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
