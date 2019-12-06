import * as mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import { extendSchema } from "../../../Functions";
import userSchema from "../../User/schema/User.schema";

const coachSchema = new mongoose.Schema({
    ...userSchema,
    teams: [{ type: mongoose.Types.ObjectId }],
    favorites: [{ type: mongoose.Types.ObjectId }],
    sport: { type: String },
    coach_type: { type: String },
    school_district: { type: String },
    school: { type: String },
    school_type: { type: String }
});

export default mongoose.model("Coach", coachSchema);
