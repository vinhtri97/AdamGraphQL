import { Resolver, Mutation, Args } from "type-graphql";
import { DirectorMutationService } from "../service/index";
import Director from "../schema/Director.schema";
import { CreateDirectorInput, UpdateDirectorInput } from "../dto/classes/index";

@Resolver()
export class DirectorMutationResolver {
    DirectorMutationService: DirectorMutationService;
    constructor() {
        this.DirectorMutationService = new DirectorMutationService();
    }

    @Mutation(() => String, { description: "This is something" })
    async createDirector(@Args() input: CreateDirectorInput): Promise<string> {
        const director = await Director.create(input);
        return director._id;
    }

    @Mutation(() => String, { description: "This is something" })
    async updateDirector(@Args() input: UpdateDirectorInput): Promise<string> {
        return await this.DirectorMutationService.updateDirector(input);
    }
}
