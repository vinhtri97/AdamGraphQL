import Field from "../schema/Field.schema";
// import FieldDto from "../dto/Field.dto";
import { CreateFieldInput, UpdateFieldInput } from "../dto/classes/index";
// import { FieldUser } from "../dto/classes/types/index";
import { updateDocument } from "../../../MongooseFunctions";
// import Spectator from "";

export class FieldMutationService {
    async createField(input: CreateFieldInput): Promise<boolean | Error> {
        await Field.create(input);
        return true;
    }

    async updateField(input: UpdateFieldInput): Promise<boolean | Error> {
        return await updateDocument(Field, input);
    }
}
