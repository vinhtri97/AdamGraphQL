/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleSpectatorRemoved } from '../../../../Functions';
import { addToObjArray, changeInObjArray, updateDocument } from '../../../../MongooseFunctions';
import Player from '../../Player/schema/Player.schema';
import { CreateSpectatorInput, UpdateSpectatorInput } from '../dto/classes';
import { SpectatorTypes } from '../enums';
import Spectator from '../schema/Spectator.schema';

export class SpectatorMutationService {
    async createSpectator(input: CreateSpectatorInput): Promise<boolean | Error> {
        await Spectator.create(input);
        return true;
    }
    // async createSpectator()

    async updateSpectator(input: UpdateSpectatorInput): Promise<boolean | Error> {
        return await updateDocument(Spectator, input);
    }

    async addSpectacle(spectatorID: string, playerID: string): Promise<boolean | Error> {
        return await addToObjArray(
            Player,
            'spectators',
            playerID,
            { accepted: false, type: 'Spectator' },
            Spectator,
            'spectacles',
            spectatorID,
            { accepted: false, type: 'Spectator' }
        );
    }

    async removeSpectacle(spectatorID: string, playerID: string): Promise<boolean | Error> {
        return await handleSpectatorRemoved(playerID, spectatorID);
    }

    async changeType(spectatorID: string, playerID: string, type: string): Promise<boolean | Error> {
        // TODO remove spectator from full chat
        if (!Object.keys(SpectatorTypes).includes(type))
            throw new Error('Spectator type must be one of: ' + Object.keys(SpectatorTypes).toString());
        return await changeInObjArray(
            Player,
            'spectators',
            playerID,
            { type, accepted: true },
            Spectator,
            'spectacles',
            spectatorID,
            { type, accepted: true }
        );
    }
}
