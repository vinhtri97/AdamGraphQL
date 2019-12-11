import Spectator from "../schema/Spectator.schema";
import {
    CreateSpectatorInput,
    UpdateSpectatorInput
} from "../dto/classes/index";
import { updateDocument } from "../../../Functions";

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
}
