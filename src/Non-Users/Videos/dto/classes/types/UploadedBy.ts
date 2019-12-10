import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("CreateUploadedByInput")
export class CreateUploadedBy {
    @Field()
    id: string;

    @Field()
    name: string;
}

@InputType("UploadedByInput")
export class UploadedByInput {
    @Field()
    id: string;

    @Field()
    name: string;
}
