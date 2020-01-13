import * as mongoose from 'mongoose';

import StatsFields from '../../StatsFields.schema';

/* eslint-disable @typescript-eslint/camelcase */
const Schema = mongoose.Schema;

const Strength = {
    bench_press_80: StatsFields,
    bench_press_weight: StatsFields,
    bench_press_PR: StatsFields,
    squat_80: StatsFields,
    squat_weight: StatsFields,
    squat_PR: StatsFields,
    deadlift_80: StatsFields,
    deadlift_weight: StatsFields,
    deadlift_press_PR: StatsFields,
    push_up: StatsFields,
    chin_up: StatsFields,
    sit_up: StatsFields,
    plank: StatsFields,
    grip: StatsFields,
    sit_and_reach: StatsFields,
    stork_balance: StatsFields,
};

const Throw = {
    overhead_throw: StatsFields,
    backwards_overhead_throw: StatsFields,
    behind_the_head_throw: StatsFields,
};

const powerSchema = new Schema({
    power_score: Number,
    strength: Strength,
    throw: Throw,
});

export default mongoose.model('Power', powerSchema);
