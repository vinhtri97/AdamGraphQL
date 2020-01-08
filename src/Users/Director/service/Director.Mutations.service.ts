import Director from "../schema/Director.schema";
import { CreateDirectorInput, UpdateDirectorInput } from "../dto/classes/index";
import { updateDocument } from "../../../MongooseFunctions";

export class DirectorMutationService {
    async createDirector(input: CreateDirectorInput): Promise<boolean> {
        await Director.create(input);
        return true;
    }
    // async createDirector()

    async updateDirector(input: UpdateDirectorInput): Promise<boolean> {
        return await updateDocument(Director, input);
    }
}
