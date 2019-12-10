import * as mongoose from "mongoose";
import EntitySchema from "../../Generics/schema/Entity.schema";

const UploadedBy = {
    id: { type: mongoose.Types.ObjectId },
    name: { type: String }
};

const VideoSchema = new mongoose.Schema({
    ...EntitySchema,
    url: { type: String },
    thumbnail: { type: String },
    type: { type: String },
    jerseyColor: { type: String },
    jerseyNumber: { type: String },
    specific_type: { type: String },
    facility: { type: String },
    date: { type: String },
    teams: [
        {
            _id: false,
            name: { type: String },
            score: { type: String }
        }
    ],
    likes: [{ type: mongoose.Types.ObjectId }],
    accepted: { type: Boolean },
    uploaded_by: { ...UploadedBy }
});

export default mongoose.model("Video", VideoSchema);
