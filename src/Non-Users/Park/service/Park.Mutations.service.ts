import Park from "../schema/Park.schema";
// import ParkDto from "../dto/Park.dto";
import { CreateParkInput, UpdateParkInput } from "../dto/classes/index";
// import { ParkUser } from "../dto/classes/types/index";
import { updateDocument } from "../../../MongooseFunctions";
// import Spectator from "";

export class ParkMutationService {
    async createPark(input: CreateParkInput): Promise<boolean | Error> {
        await Park.create(input);
        return true;
    }

    async updatePark(input: UpdateParkInput): Promise<boolean | Error> {
        return await updateDocument(Park, input);
    }
}
