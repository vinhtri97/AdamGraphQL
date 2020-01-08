/* eslint-disable @typescript-eslint/camelcase */
import { Arg, Query, Resolver } from 'type-graphql';

import ParkDto from '../../Park/dto/Park.dto';
import Park from '../../Park/schema/Park.schema';
import FieldDto from '../dto/Field.dto';
import Field from '../schema/Field.schema';
import { FieldQueryService } from '../service';

@Resolver()
export class FieldQueryResolver {
    FieldQueryService: FieldQueryService;
    constructor() {
        this.FieldQueryService = new FieldQueryService();
    }

    @Query(() => [FieldDto])
    async getFields(): Promise<Array<FieldDto>> {
        return await this.FieldQueryService.getFields();
    }

    @Query(() => FieldDto)
    async getFieldByID(@Arg('fieldID') fieldID: string): Promise<FieldDto> {
        const foundField = await Field.findById(fieldID).lean();
        if (!foundField) throw new Error('Cannot find field with that ID');
        return foundField;
    }

    @Query(() => ParkDto)
    async getParkForField(@Arg('fieldID') fieldID: string): Promise<ParkDto> {
        const foundField = await Field.findById(fieldID).lean();
        if (!foundField) throw new Error('Cannot find field with that ID');
        const foundPark = await Park.findById(foundField.park).lean();
        if (!foundPark) throw new Error('Cannot find park with that ID');
        return foundPark;
    }
}
