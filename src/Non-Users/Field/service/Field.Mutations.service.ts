import Field from "../schema/Field.schema";
// import FieldDto from "../dto/Field.dto";
import { CreateFieldInput, UpdateFieldInput } from "../dto/classes/index";
// import { FieldUser } from "../dto/classes/types/index";
import { updateDocument } from "../../../Functions";
// import Spectator from "";

export class FieldMutationService {
    async createField(input: CreateFieldInput): Promise<boolean | Error> {
        // const { players, coaches, spectators, directors } = input;
        await Field.create(input);
        // await Promise.all(spectators.map(({id:spectID}: FieldUser) => await ))
        return true;
    }

    async updateField(input: UpdateFieldInput): Promise<boolean | Error> {
        return await updateDocument(Field, input);
    }
}
