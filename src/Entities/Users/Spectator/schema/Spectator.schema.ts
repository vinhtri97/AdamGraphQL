import * as mongoose from 'mongoose';

import UserSchema from '../../Generic/schema/User.schema';
import { SpectatorTypes } from '../enums';

/* eslint-disable @typescript-eslint/camelcase */
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
        enum: Object.values(SpectatorTypes),
        default: 'Spectator'
    },
    id: { type: mongoose.Types.ObjectId }
};

const SpectatorSchema = new mongoose.Schema({
    ...UserSchema,
    // TODO Will chats always be connected through a team?
    user_type: { type: String, default: 'Spectator' },
    chats: [{ ...ChatObj }],
    spectacles: [{ ...SpectacleObj }]
});

export default mongoose.model('Spectator', SpectatorSchema);
