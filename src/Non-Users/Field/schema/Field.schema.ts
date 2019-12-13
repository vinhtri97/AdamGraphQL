import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";

const FieldSchema = new mongoose.Schema({
    ...EntitySchema,
    park: { type: mongoose.Types.ObjectId },
    has_seating: { type: Boolean },
    is_turf: { type: Boolean },
    // type enum by sport
    // indoor / outdoor
    // dimensions/size
    highschool_compatible: { type: Boolean }
});

export default mongoose.model("Field", FieldSchema);
