import { addToStringArray, removeFromStringArray, updateDocument } from '../../../../MongooseFunctions';
import Player from '../../Player/schema/Player.schema';
import { CreateCoachInput, UpdateCoachInput } from '../dto/classes';
import Coach from '../schema/Coach.schema';

export class CoachMutationService {
    async createCoach(input: CreateCoachInput): Promise<boolean | Error> {
        const coach = await Coach.create(input);
        if (coach) return true;
        else return new Error('Could not create coach');
    }
    // async createCoach()

    async updateCoach(input: UpdateCoachInput): Promise<boolean | Error> {
        return await updateDocument(Coach, input);
    }

    async addFavorite(coachID: string, playerID: string): Promise<boolean | Error> {
        return await addToStringArray(Player, 'favorites', playerID, Coach, 'favorites', coachID);
    }

    async removeFavorite(coachID: string, playerID: string): Promise<boolean | Error> {
        return await removeFromStringArray(Player, 'favorites', playerID, Coach, 'favorites', coachID);
    }
}
