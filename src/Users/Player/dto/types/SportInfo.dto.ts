import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("SportInfoInput")
export class SportInfo {
    @Field()
    position: string;

    @Field({ nullable: true })
    secondary_position: string;

    @Field({ nullable: true })
    throwing: string;

    @Field({ nullable: true })
    batting: string;

    @Field()
    sport: string;

    @Field({ nullable: true })
    committed: string;

    @Field({ nullable: true })
    committed_date: string;
}
