/* eslint-disable @typescript-eslint/camelcase */
import * as mongoose from 'mongoose';

import StatsFields from '../../StatsFields.schema';

const Schema = mongoose.Schema;

const Movement = {
    ten_yard_shuttle: StatsFields,
    twenty_yard_shuttle: StatsFields,
    three_cone_drill: StatsFields,
    t_test: StatsFields,
    compass_agility: StatsFields,
    box_drill: StatsFields,
    quadrant_jump: StatsFields,
};

const Speed = {
    ten_yard_dash: StatsFields,
    twenty_yard_dash: StatsFields,
    thirty_yard_dash: StatsFields,
    forty_yard_dash: StatsFields,
    fifty_yard_dash: StatsFields,
    sixty_yard_dash: StatsFields,
    ladder_drill: StatsFields,
};

const Jump = {
    broad_jump: StatsFields,
    triple_jump: StatsFields,
    vertical_jump: StatsFields,
    one_step_vertical_jump: StatsFields,
};

const agilitySchema = new Schema({
    jump_score: Number,
    agility_score: Number,
    speed_score: Number,
    core_score: Number,
    movement: Movement,
    speed: Speed,
    jump: Jump,
});

export default mongoose.model('Agility', agilitySchema);
