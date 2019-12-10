import { Resolver, Arg, Query } from "type-graphql";
import { SpectatorQueryService } from "../service/index";
import SpectatorDto from "../dto/Spectator.dto";

@Resolver()
export class SpectatorQueryResolver {
    SpectatorQueryService: SpectatorQueryService;
    constructor() {
        this.SpectatorQueryService = new SpectatorQueryService();
    }

    @Query(() => [SpectatorDto])
    async getSpectators(): Promise<Array<SpectatorDto>> {
        return await this.SpectatorQueryService.getSpectators();
    }

    @Query(() => SpectatorDto)
    async getSpectatorByID(@Arg("id") id: string): Promise<SpectatorDto> {
        return await this.SpectatorQueryService.getSpectatorByID(id);
    }
}
