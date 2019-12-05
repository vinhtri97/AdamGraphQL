import { Resolver, Arg, Query } from "type-graphql";
import { CoachQueryService } from "../service/index";
import CoachDto from "../dto/coach.dto";
import PlayerDto from "../../Player/dto/player.dto";
@Resolver()
export class CoachQueryResolver {
    coachQueryService: CoachQueryService;
    constructor() {
        this.coachQueryService = new CoachQueryService();
    }

    @Query(() => [CoachDto])
    async getCoaches(): Promise<Array<CoachDto>> {
        return await this.coachQueryService.getCoaches();
    }

    @Query(() => CoachDto)
    async getCoachByID(@Arg("id") id: string): Promise<CoachDto> {
        return await this.coachQueryService.getCoachByID(id);
    }

    @Query(() => [PlayerDto])
    async getFavoritesForCoach(
        @Arg("coachID") coachID: string
    ): Promise<Array<PlayerDto>> {
        return await this.coachQueryService.getFavorites(coachID);
    }
}
