import Coach from "../schema/coach.schema";
import CreateCoachInput from "../inputs/createCoach.input";

export default class CoachMutations {
    async createCoach(input: CreateCoachInput): Promise<string> {
        await Coach.create(input);
        return input.id;
    }

    async updateCoach(id: string, thumbnail: string): Promise<string> {
        const coach = await Coach.findByIdAndUpdate(id, {
            $set: { thumbnail }
        });
        console.log(coach);
        return id;
    }
}
