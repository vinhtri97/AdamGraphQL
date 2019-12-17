import Coach from "../schema/Coach.schema";
import Player from "../../Player/schema/Player.schema";
import { CreateCoachInput, UpdateCoachInput } from "../dto/classes/index";
import { addToStringArray, updateDocument } from "../../../MongooseFunctions";
export class CoachMutationService {
    async createCoach(input: CreateCoachInput): Promise<string> {
        const coach = await Coach.create(input);
        return coach._id;
    }
    // async createCoach()

    async updateCoach(input: UpdateCoachInput): Promise<string> {
        await updateDocument(Coach, input);
        return "Test";
    }

    async addFavorite(coachID: string, playerID: string): Promise<string> {
        await addToStringArray(
            Player,
            "favorites",
            playerID,
            Coach,
            "favorites",
            coachID
        );
        return "ok";
    }
}
