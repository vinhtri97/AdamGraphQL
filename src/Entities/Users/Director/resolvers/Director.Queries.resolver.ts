import { Resolver, Arg, Query } from "type-graphql";
import { DirectorQueryService } from "../service/index";
import DirectorDto from "../dto/Director.dto";
import TournamentDto from "../../../Non-Users/Tournament/dto/Tournament.dto";

@Resolver()
export class DirectorQueryResolver {
    DirectorQueryService: DirectorQueryService;
    constructor() {
        this.DirectorQueryService = new DirectorQueryService();
    }

    @Query(() => [DirectorDto])
    async getDirectors(): Promise<Array<DirectorDto>> {
        return await this.DirectorQueryService.getDirectors();
    }

    @Query(() => DirectorDto)
    async getDirectorByID(
        @Arg("directorID") directorID: string
    ): Promise<DirectorDto> {
        return await this.DirectorQueryService.getDirectorByID(directorID);
    }

    @Query(() => [TournamentDto])
    async getTournamentsForDirector(
        @Arg("directorID") directorID: string
    ): Promise<Array<TournamentDto>> {
        return await this.DirectorQueryService.getTournaments(directorID);
    }
}
