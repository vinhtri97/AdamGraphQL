import * as mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import { extendSchema } from "../../../Functions";
import UserSchema from "../../Generic/schema/User.schema";

const DirectorSchema = new mongoose.Schema({
    ...UserSchema,
    tournaments: [{ type: mongoose.Types.ObjectId }],
    association: { type: String }
});

export default mongoose.model("Director", DirectorSchema);
