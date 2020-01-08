import { updateDocument } from '../../../../MongooseFunctions';
import { CreateParkInput, UpdateParkInput } from '../dto/classes';
import Park from '../schema/Park.schema';

export class ParkMutationService {
    async createPark(input: CreateParkInput): Promise<boolean | Error> {
        await Park.create(input);
        return true;
    }

    async updatePark(input: UpdateParkInput): Promise<boolean | Error> {
        return await updateDocument(Park, input);
    }

    // async addField(parkID: string, fieldID: string): Promise<boolean | Error> {
    //     // TODO when learn input
    //     const foundPark = await Park.findById(parkID).limit(1);
    //     if (!foundPark) throw new Error('Invalid park ID');
    // }

    // async removeField(parkID: string, fieldID: string): Promise<boolean | Error> {
    //     // TODO when learn input
    //     // return await updateDocument(Park, input);
    // }
}
