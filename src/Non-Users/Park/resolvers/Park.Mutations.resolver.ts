import { Mutation, Resolver, Args } from "type-graphql";
// import ParkDto from "../dto/Park.dto";
// import Park from "../schema/Park.schema";
import { ParkMutationService } from "../service/index";
import { CreateParkInput, UpdateParkInput } from "../dto/classes/index";
@Resolver()
export class ParkMutationResolver {
    ParkMutationService: ParkMutationService;
    constructor() {
        this.ParkMutationService = new ParkMutationService();
    }

    @Mutation(() => Boolean)
    async createPark(@Args() input: CreateParkInput): Promise<boolean | Error> {
        return await this.ParkMutationService.createPark(input);
    }

    @Mutation(() => Boolean)
    async updatePark(@Args() input: UpdateParkInput): Promise<boolean | Error> {
        return await this.ParkMutationService.updatePark(input);
    }
}
