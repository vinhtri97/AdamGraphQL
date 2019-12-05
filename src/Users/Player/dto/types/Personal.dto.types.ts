import { ObjectType, Field, InputType } from "type-graphql";
import { IsIn } from "class-validator";

@ObjectType()
@InputType("PersonalInput")
export class Personal {
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    dob: string;

    @Field()
    phone: string;

    @Field()
    @IsIn(["male", "female", "other"])
    gender: string;
}
