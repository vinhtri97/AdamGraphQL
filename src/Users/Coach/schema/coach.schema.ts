import * as mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import { extendSchema } from "../../../Functions";
import UserSchema from "../../Generic/schema/User.schema";

const coachSchema = new mongoose.Schema({
    ...UserSchema,
    teams: [{ type: mongoose.Types.ObjectId }],
    user_type: { type: String, default: "Coach" },
    favorites: [{ type: mongoose.Types.ObjectId }],
    sport: { type: String },
    coach_type: { type: String },
    school_district: { type: String },
    school: { type: String },
    school_type: { type: String }
});

export default mongoose.model("Coach", coachSchema);
