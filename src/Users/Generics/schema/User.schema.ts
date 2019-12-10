export default {
    firebase_id: { type: String },
    thumbnail: {
        type: String,
        default: "https://playerwatchtest.s3.amazonaws.com/PlayerWatch/user.png"
    },
    user_type: {
        type: String,
        enum: ["Player", "Coach", "Director", "Spectator"]
    },
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
        zip: { type: Number }
    },
    personal: {
        first_name: { type: String },
        last_name: { type: String },
        dob: { type: String },
        gender: { type: String },
        phone: { type: String }
    },
    email: { type: String },
    tokens: [{ type: String }],
    stripeTokenCustomerId: String
};
