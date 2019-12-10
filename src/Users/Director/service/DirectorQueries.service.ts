import Director from "../schema/Director.schema";
import DirectorDto from "../dto/Director.dto";

export class DirectorQueryService {
    async getDirectors(): Promise<Array<DirectorDto>> {
        return await Director.find({}).lean();
    }

    async getDirectorByID(id: string): Promise<DirectorDto> {
        return await Director.findById(id).lean();
    }
}
