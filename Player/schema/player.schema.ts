import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    email: String,
    dob: String,
});

const model = mongoose.model("Player", playerSchema);

export default model;
