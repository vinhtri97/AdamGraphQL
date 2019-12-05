import { Resolver, Arg, Query } from "type-graphql";
import CoachQueries from "../service/CoachQueries.service";
import CoachDto from "../dto/coach.dto";

@Resolver()
export class CoachQueryResolver {
    coachQuery: CoachQueries;
    constructor() {
        this.coachQuery = new CoachQueries();
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
