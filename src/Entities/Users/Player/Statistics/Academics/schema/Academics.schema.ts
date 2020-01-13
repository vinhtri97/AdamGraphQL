/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const academicsSchema = new Schema({
    ACT_Score: { type: Number },
    SAT_Score: { type: Number },
    GPA: { type: Number },
});

export default mongoose.model('Academics', academicsSchema);
