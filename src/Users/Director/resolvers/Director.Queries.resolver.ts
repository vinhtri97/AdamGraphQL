import { Resolver, Arg, Query } from "type-graphql";
import { DirectorQueryService } from "../service/index";
import DirectorDto from "../dto/Director.dto";

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
    async getDirectorByID(@Arg("id") id: string): Promise<DirectorDto> {
        return await this.DirectorQueryService.getDirectorByID(id);
    }
}
