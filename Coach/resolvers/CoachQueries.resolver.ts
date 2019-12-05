import { Resolver, Arg, Query } from "type-graphql";
import { CoachQueryService } from "../service/index";
import CoachDto from "../dto/coach.dto";

@Resolver()
export class CoachQueryResolver {
    coachQuery: CoachQueryService;
    constructor() {
        this.coachQuery = new CoachQueryService();
    }

    @Query(() => [CoachDto])
    async getCoaches(): Promise<Array<CoachDto>> {
        return await this.coachQuery.getCoaches();
    }

    @Query(() => CoachDto)
    async getCoachByID(@Arg("id") id: string): Promise<CoachDto> {
        return await this.coachQuery.getCoachByID(id);
    }
}
