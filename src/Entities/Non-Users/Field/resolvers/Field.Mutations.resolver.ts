import { Args, Mutation, Resolver } from 'type-graphql';

import { CreateFieldInput, UpdateFieldInput } from '../dto/classes';
import { FieldMutationService } from '../service';

// import FieldDto from "../dto/Field.dto";
// import Field from "../schema/Field.schema";
@Resolver()
export class FieldMutationResolver {
    FieldMutationService: FieldMutationService;
    constructor() {
        this.FieldMutationService = new FieldMutationService();
    }

    @Mutation(() => Boolean)
    async createField(@Args() input: CreateFieldInput): Promise<boolean | Error> {
        return await this.FieldMutationService.createField(input);
    }

    @Mutation(() => Boolean)
    async updateField(@Args() input: UpdateFieldInput): Promise<boolean | Error> {
        return await this.FieldMutationService.updateField(input);
    }
}
