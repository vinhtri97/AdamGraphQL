/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import FieldDto from "../dto/Field.dto";
import Field from "../schema/Field.schema";
import { FieldQueryService } from "../service/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
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
    async getFieldByID(@Arg("id") id: string): Promise<FieldDto> {
        return await Field.findById(id).lean();
    }
}
