/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectType, Field } from "type-graphql";
<<<<<<< Updated upstream:src/Non-Users/Videos/dto/Video.dto.ts
import EntityDto from "../../Generics/dto/Entity.dto";
=======
import EntityDto from "../../Generic/dto/Entity.dto";
>>>>>>> Stashed changes:src/Non-Users/Video/dto/Video.dto.ts
import { CreateUploadedBy } from "./classes/types/index";

@ObjectType()
export default class VideoDto extends EntityDto {
    @Field()
    url: string;

    @Field()
    type: string;

    @Field({ nullable: true })
    jersey_color: string;

    @Field({ nullable: true })
    jersey_number: string;

    @Field({ nullable: true })
    specific_type: string;

    @Field({ nullable: true })
    facility: string;

    @Field()
    date: string;

    @Field(() => [String], { nullable: true })
    teams: string[];

    @Field(() => [String], { nullable: true })
    likes: string[];

    @Field({ nullable: true })
    accepted: boolean;

    @Field(() => CreateUploadedBy)
    uploaded_by: CreateUploadedBy;
}
