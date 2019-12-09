import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generics/dto/Entity.dto";

@ObjectType()
export default class TournamentDto extends EntityDto {
    /*
        start_date: { type: String },
        end_date: { type: String },
        age_groups: {},
        flyer: { type: String },
        max_teams: { type: Number },
        pay_at_the_plate: { type: Boolean },
        hotels: { type: String },
        allowed_assistants: { type: Number },
        parks: [{ type: mongoose.Types.ObjectId }]
    */
    @Field(() => String)
    start_date: string;

    @Field(() => String)
    end_date: string;

    @Field(() => String)
    age_groups: string;

    @Field(() => String)
    flyer: string;

    @Field(() => Number)
    max_teams: number;

    @Field(() => Boolean)
    pay_at_the_plate: boolean;

    @Field(() => String)
    hotels: string;

    @Field(() => Number)
    allowed_assistants: number;

    @Field(() => [String])
    parks: string[];
}
