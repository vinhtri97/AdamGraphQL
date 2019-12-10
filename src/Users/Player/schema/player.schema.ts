import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
import UserSchema from "../../Generic/schema/User.schema";

const playerSchema = new Schema({
    ...UserSchema,
    user_type: { type: String, default: "Coach" },
    school_info: {
        grad_year: { type: String },
        school_district: { type: String },
        school: { type: String },
        school_type: { type: String }
    },
    sport_info: {
        position: { type: String },
        secondary_position: { type: String },
        throwing: { type: String },
        batting: { type: String },
        sport: { type: String },
        committed: { type: String },
        committed_date: { type: String }
    },
    power_score: {
        type: Array,
        default: [
            {
                _id: false,
                value: -1,
                Date: new Date()
            }
        ]
    },
    pending_spectators: [{ type: mongoose.Types.ObjectId }],
    accepted_spectators: [{ type: mongoose.Types.ObjectId }],
    pending_teams: [{ type: mongoose.Types.ObjectId }],
    accepted_teams: [{ type: mongoose.Types.ObjectId }],
    video_likes: [{ type: mongoose.Types.ObjectId }],
    pending_videos: [{ type: mongoose.Types.ObjectId }],
    accepted_videos: [{ type: mongoose.Types.ObjectId }],
    favorites: [{ type: mongoose.Types.ObjectId }],
    statistics: {
        basketball: [{ type: mongoose.Types.ObjectId }],
        baseball: [{ type: mongoose.Types.ObjectId }],
        soccer: [{ type: mongoose.Types.ObjectId }],
        tennis: [{ type: mongoose.Types.ObjectId }],
        volleyball: [{ type: mongoose.Types.ObjectId }],
        academics: [{ type: mongoose.Types.ObjectId }],
        physical: [{ type: mongoose.Types.ObjectId }],
        agility: [{ type: mongoose.Types.ObjectId }],
        power: [{ type: mongoose.Types.ObjectId }]
    }
});

export default mongoose.model("Player", playerSchema);
