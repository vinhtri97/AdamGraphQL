import Bug from "../schema/Bug.schema";
import BugDto from "../dto/Bug.dto";
export class BugQueryService {
    async getBugs(): Promise<Array<BugDto>> {
        return await Bug.find({}).lean();
    }
}
