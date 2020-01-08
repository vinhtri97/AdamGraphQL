import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";
//User Schema
const TournamentSchema = new mongoose.Schema({
    ...EntitySchema,
    start_date: { type: String },
    end_date: { type: String },
    age_groups: {},
    flyer: { type: String },
    max_teams: { type: Number },
    pay_at_the_plate: { type: Boolean },
    fee_description: { type: String },
    hotels: { type: String },
    allowed_assistants: { type: Number },
    parks: [{ type: mongoose.Types.ObjectId }]
});
export default mongoose.model("Tournament", TournamentSchema);
