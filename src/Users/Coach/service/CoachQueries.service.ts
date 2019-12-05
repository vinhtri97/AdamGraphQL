import Coach from "../schema/coach.schema";
import CoachDto from "../dto/coach.dto";

export class CoachQueryService {
    async getCoaches(): Promise<Array<CoachDto>> {
        return await Coach.find({}).lean();
    }

    async getCoachByID(id: string): Promise<CoachDto> {
        return await Coach.findById(id).lean();
    }
}
