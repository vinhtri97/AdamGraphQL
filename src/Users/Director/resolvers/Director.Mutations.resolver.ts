import { Resolver, Mutation, Args } from "type-graphql";
import { DirectorMutationService } from "../service/index";
import { CreateDirectorInput, UpdateDirectorInput } from "../dto/classes/index";

@Resolver()
export class DirectorMutationResolver {
    DirectorMutationService: DirectorMutationService;
    constructor() {
        this.DirectorMutationService = new DirectorMutationService();
    }

    @Mutation(() => Boolean)
    async createDirector(@Args() input: CreateDirectorInput): Promise<boolean> {
        return this.DirectorMutationService.createDirector(input);
    }

    @Mutation(() => Boolean)
    async updateDirector(@Args() input: UpdateDirectorInput): Promise<boolean> {
        return await this.DirectorMutationService.updateDirector(input);
    }
}
