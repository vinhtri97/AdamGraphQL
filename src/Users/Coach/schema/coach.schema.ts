import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const coachSchema = new Schema({
    id: { type: String },
    email: { type: String },
    thumbnail: {
        type: String,
        default: "https://playerwatchtest.s3.amazonaws.com/PlayerWatch/user.png"
    },
    sport_info: {
        sport: { type: String },
        coach_type: { type: String }
    },
    user_type: { type: String, default: "Coach" },
    banner: { type: String },
    personal: {
        first_name: { type: String },
        last_name: { type: String },
        phone: { type: String }
    },
    teams: { type: Array },
    favorites: { type: Array },
    address: {
        state: { type: String },
        zip: { type: Number }
    },
    school_info: {
        school_district: { type: String },
        school: { type: String },
        school_type: { type: String }
    }
});

export default mongoose.model("Coach", coachSchema);
