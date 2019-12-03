import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    email: String,
    dob: String,
});

export default mongoose.model("Player", playerSchema);
