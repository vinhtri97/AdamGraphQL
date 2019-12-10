/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Bug from "../schema/Bug.schema";
// import { BugDto } from "../dto/Bug.dto";
export class BugQueryService {
    async getBugs(): Promise<any[]> {
        return await Bug.find({}).lean();
    }
}
