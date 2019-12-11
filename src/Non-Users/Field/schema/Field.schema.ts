import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";

const FieldSchema = new mongoose.Schema({
    ...EntitySchema,
    park: { type: mongoose.Types.ObjectId },
    highschool_compatible: { type: Boolean }
});

export default mongoose.model("Field", FieldSchema);
