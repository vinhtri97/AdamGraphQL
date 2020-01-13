/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BMI = {
    height: { type: String },
    weight: { type: String },
};

const Extremity = {
    wing_span: { type: Number },
    hand_size: { type: Number },
    shoe_size: { type: Number },
};

const Dominance = {
    hand_dominance: { type: String },
    eye_dominance: { type: String },
    leg_dominance: { type: String },
};

const physicalSchema = new Schema({
    bmi: BMI,
    extremity: Extremity,
    dominance: Dominance,
});

export default mongoose.model('Physical', physicalSchema);
