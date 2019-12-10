import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";

const ChatUserSchema = {
    _id: false,
    id: { type: mongoose.Types.ObjectId },
    muted: { type: Boolean, default: false },
    muted_type: {
        type: String,
        enum: ["24 Hour", "Forever"]
    }
};

//User Schema
const ChatSchema = new mongoose.Schema({
    ...EntitySchema,
    isPremade: { type: Boolean, default: false },
    players: [{ ...ChatUserSchema }],
    coaches: [{ ...ChatUserSchema }],
    spectators: [{ ...ChatUserSchema }],
    team_id: { type: mongoose.Types.ObjectId }
});
export default mongoose.model("Chat", ChatSchema);
