import Coach from "../schema/coach.schema";
import Player from "../../Player/schema/player.schema";
import CreateCoachInput from "../inputs/CreateCoach.input";
import { addBasicLink } from "../../../Functions";
export class CoachMutationService {
    async createCoach(input: CreateCoachInput): Promise<string> {
        const coach = await Coach.create(input);
        return coach._id;
    }
    // async createCoach()

    async updateCoach(id: string, thumbnail: string): Promise<string> {
        const coach = await Coach.findByIdAndUpdate(id, {
            $set: { thumbnail }
        });
        console.log(coach);
        return id;
    }

    async addFavorite(coachID: string, playerID: string): Promise<string> {
        await addBasicLink(Player, playerID, coachID, "favorites");
        await addBasicLink(Coach, coachID, playerID, "favorites");
        return "ok";
    }
}
