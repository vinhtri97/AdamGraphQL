import * as mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import { extendSchema } from "../../../Functions";
import UserSchema from "../../Generic/schema/User.schema";

const ChatObj = {
    _id: false,
    chat_id: { type: mongoose.Types.ObjectId },
    team_id: { type: mongoose.Types.ObjectId },
    has_muted: { type: Boolean, default: false }
};
const SpectacleObj = {
    _id: false,
    accepted: { type: Boolean, default: false },
    type: {
        type: String,
        enum: ["Mom", "Dad", "Guardian", "Spectator"],
        default: "Spectator"
    },
    id: { type: mongoose.Types.ObjectId }
};

const SpectatorSchema = new mongoose.Schema({
    ...UserSchema,
    // TODO Will chats always be connected through a team?
    chats: [{ ...ChatObj }],
    spectacles: [{ ...SpectacleObj }]
});

export default mongoose.model("Spectator", SpectatorSchema);
