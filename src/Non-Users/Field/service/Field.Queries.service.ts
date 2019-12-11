import Field from "../schema/Field.schema";
import FieldDto from "../dto/Field.dto";
export class FieldQueryService {
    async getFields(): Promise<Array<FieldDto>> {
        return await Field.find({}).lean();
    }
}
