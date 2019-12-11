import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";

const ParkSchema = new mongoose.Schema({
    ...EntitySchema,
    fields: [{ type: mongoose.Types.ObjectId }],
    open_time: { type: String },
    close_time: { type: String },
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
        zip: { type: Number }
    }
});

export default mongoose.model("Park", ParkSchema);
