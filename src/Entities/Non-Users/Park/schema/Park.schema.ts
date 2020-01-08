import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";

const ParkSchema = new mongoose.Schema({
    ...EntitySchema,
    fields: [{ type: mongoose.Types.ObjectId }],
    open_time: { type: String },
    close_time: { type: String },
    website: { type: String },
    park_owner: { type: String },
    free_wifi: { type: Boolean },
    pictures: { type: Array },
    sports: { type: Array },
    concessions: { type: Boolean },
    // GPS coords
    ice_chest: { type: Boolean },
    smoking: { type: Boolean },
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
        zip: { type: Number }
    }
});

export default mongoose.model("Park", ParkSchema);
