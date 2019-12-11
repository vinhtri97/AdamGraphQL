import Park from "../schema/Park.schema";
import ParkDto from "../dto/Park.dto";
export class ParkQueryService {
    async getParks(): Promise<Array<ParkDto>> {
        return await Park.find({}).lean();
    }
}
