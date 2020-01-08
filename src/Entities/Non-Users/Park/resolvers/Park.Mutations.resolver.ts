import { Args, Mutation, Resolver } from 'type-graphql';

import { CreateParkInput, UpdateParkInput } from '../dto/classes';
import { ParkMutationService } from '../service';

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

    // TODO when learn input
    // @Mutation(() => Boolean)
    // async addField(@Arg('parkID') parkID: string, @Arg('fieldID') fieldID: string): Promise<boolean | Error> {
    //     return await this.ParkMutationService.addField(parkID, fieldID);
    // }

    // @Mutation(() => Boolean)
    // async removeField(@Arg('parkID') parkID: string, @Arg('fieldID') fieldID: string): Promise<boolean | Error> {
    //     return await this.ParkMutationService.removeField(parkID, fieldID);
    // }
}
