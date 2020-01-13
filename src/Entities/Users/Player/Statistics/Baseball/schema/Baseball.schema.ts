/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';

import StatsFields from '../../StatsFields.schema';

const Schema = mongoose.Schema;

const baseballSchema = new Schema({
    velocity: StatsFields,
    exit_speed: StatsFields,
    ball_fielding_100: StatsFields,
    longtoss: StatsFields,
    pop_time: StatsFields,
    home_to_second: StatsFields,
});

export default mongoose.model('Baseball', baseballSchema);
