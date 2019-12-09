import Coach from "../schema/coach.schema";
import Player from "../../Player/schema/Player.schema";
import { CreateCoachInput, UpdateCoachInput } from "../dto/classes/index";
import { addLink, patchDocument } from "../../../Functions";
export class CoachMutationService {
    async createCoach(input: CreateCoachInput): Promise<string> {
        const coach = await Coach.create(input);
        return coach._id;
    }
    // async createCoach()

    async updateCoach(input: UpdateCoachInput): Promise<string> {
        await patchDocument(Coach, input);
        return "Test";
    }

    async addFavorite(coachID: string, playerID: string): Promise<string> {
        await addLink(Player, playerID, coachID, "favorites");
        await addLink(Coach, coachID, playerID, "favorites");
        return "ok";
    }
}
