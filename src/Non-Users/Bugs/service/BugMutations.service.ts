import Bug from "../schema/Bug.schema";
// import BugDto from "../dto/Bug.dto";
import { CreateBugInput, UpdateBugInput } from "../dto/classes/index";
// import { BugUser } from "../dto/classes/types/index";
import { updateDocument } from "../../../Functions";
// import Spectator from "";

export class BugMutationService {
    async createBug(input: CreateBugInput): Promise<boolean | Error> {
        // const { players, coaches, spectators, directors } = input;
        await Bug.create(input);
        // await Promise.all(spectators.map(({id:spectID}: BugUser) => await ))
        return true;
    }

    async updateBug(input: UpdateBugInput): Promise<boolean | Error> {
        return await updateDocument(Bug, input);
    }
}
