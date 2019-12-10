import * as mongoose from "mongoose";
import EntitySchema from "../../Generic/schema/Entity.schema";
//User Schema
const teamSchema = new mongoose.Schema({
    ...EntitySchema,
    coaches: [{ type: mongoose.Types.ObjectId }],
    chats: [{ type: mongoose.Types.ObjectId }],
    fullPlayerChat: { type: mongoose.Types.ObjectId },
    fullPlayerAndParentChat: { type: mongoose.Types.ObjectId },
    tournaments: [{ type: mongoose.Types.ObjectId }],
    accepted_players: [{ type: mongoose.Types.ObjectId }],
    pending_players: [{ type: mongoose.Types.ObjectId }]
});
export default mongoose.model("Team", teamSchema);
