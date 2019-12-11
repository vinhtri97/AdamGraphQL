import Director from "../schema/Director.schema";
import { CreateDirectorInput, UpdateDirectorInput } from "../dto/classes/index";
import { updateDocument } from "../../../Functions";

export class DirectorMutationService {
    async createDirector(input: CreateDirectorInput): Promise<string> {
        const director = await Director.create(input);
        return director._id;
    }
    // async createDirector()

    async updateDirector(input: UpdateDirectorInput): Promise<string> {
        await updateDocument(Director, input);
        return "Test";
    }
}
