import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
@InputType("UpdateTournamentInput")
export class UpdateTournamentInput extends UpdateEntityInput {
    @Field(() => String, { nullable: true })
    start_date?: string;

    @Field(() => String, { nullable: true })
    end_date?: string;

    // TODO Age groups
    @Field(() => String, { nullable: true })
    age_groups?: string;

    @Field(() => String, { nullable: true })
    flyer?: string;

    @Field(() => Number, { nullable: true })
    max_teams?: number;

    @Field(() => Boolean, { nullable: true })
    pay_at_the_plate?: boolean;

    @Field(() => String, { nullable: true })
    hotels?: string;

    @Field(() => Number, { nullable: true })
    allowed_assistants?: number;
}
