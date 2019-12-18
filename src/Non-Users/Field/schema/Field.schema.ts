import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";

const FieldSchema = new mongoose.Schema({
    ...EntitySchema,
    park: { type: mongoose.Types.ObjectId },
    has_seating: { type: Boolean },
    is_turf: { type: Boolean },
    pictures: { type: Array },
    electricity: { type: Boolean },
    sports: { type: Array },
    is_indoor: { type: Boolean },
    size: { type: Boolean },
    highschool_compatible: { type: Boolean }
});

export default mongoose.model("Field", FieldSchema);
