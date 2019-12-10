import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
@InputType("CreateTournamentInput")
export class CreateTournamentInput extends CreateEntityInput {
    @Field(() => String)
    start_date: string;

    @Field(() => String)
    end_date: string;

    @Field(() => String)
    age_groups: string;

    @Field(() => String, { nullable: true })
    flyer?: string;

    @Field(() => Number, { nullable: true })
    max_teams?: number;

    @Field(() => Boolean)
    pay_at_the_plate: boolean;

    @Field(() => String, { nullable: true })
    hotels?: string;

    @Field(() => Number, { nullable: true })
    allowed_assistants?: number;

    // TODO
    // @Field(() => [String])
    // parks: string[];
}
