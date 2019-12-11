import { Mutation, Resolver, Args } from "type-graphql";
// import FieldDto from "../dto/Field.dto";
// import Field from "../schema/Field.schema";
import { FieldMutationService } from "../service/index";
import { CreateFieldInput, UpdateFieldInput } from "../dto/classes/index";
@Resolver()
export class FieldMutationResolver {
    FieldMutationService: FieldMutationService;
    constructor() {
        this.FieldMutationService = new FieldMutationService();
    }

    @Mutation(() => Boolean)
    async createField(
        @Args() input: CreateFieldInput
    ): Promise<boolean | Error> {
        return await this.FieldMutationService.createField(input);
    }

    @Mutation(() => Boolean)
    async updateField(
        @Args() input: UpdateFieldInput
    ): Promise<boolean | Error> {
        return await this.FieldMutationService.updateField(input);
    }
}
