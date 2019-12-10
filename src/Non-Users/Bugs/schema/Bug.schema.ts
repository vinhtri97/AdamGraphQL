import * as mongoose from "mongoose";
import EntitySchema from "../../Generics/schema/Entity.schema";

const BugSchema = new mongoose.Schema({
    ...EntitySchema,
    message: { type: String },
    date: { type: String },
    category: { type: String },
    email: { type: String },
    first_name: { type: String },
    last_name: { type: String }
});

export default mongoose.model("Bug", BugSchema);
