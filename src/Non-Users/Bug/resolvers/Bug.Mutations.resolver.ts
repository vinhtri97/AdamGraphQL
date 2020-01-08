import { Mutation, Resolver, Args, Arg } from "type-graphql";
// import BugDto from "../dto/Bug.dto";
// import Bug from "../schema/Bug.schema";
import { BugMutationService } from "../service/index";
import { CreateBugInput, UpdateBugInput } from "../dto/classes/index";
@Resolver()
export class BugMutationResolver {
    BugMutationService: BugMutationService;
    constructor() {
        this.BugMutationService = new BugMutationService();
    }

    @Mutation(() => Boolean)
    async createBug(@Args() input: CreateBugInput): Promise<boolean | Error> {
        return await this.BugMutationService.createBug(input);
    }

    @Mutation(() => Boolean)
    async updateBug(@Args() input: UpdateBugInput): Promise<boolean | Error> {
        return await this.BugMutationService.updateBug(input);
    }

    @Mutation(() => Boolean)
    async deleteBug(@Arg("bugID") bugID: string): Promise<boolean | Error> {
        return await this.BugMutationService.deleteBug(bugID);
    }
}
