import { Schema, model } from 'mongoose';
import user from './user-schema';

const worshipEventDetails = new Schema({
    eventId: {
        type: String,
        required: true
    },
    teamList: [
        {
            roleId: String,
            roleName: String,
            teamMember: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                }
            ],
            teamMapping: [
                {
                    memberId: String,
                    tag: String
                }
            ]
        }
    ],
    rehearsals: [
        {
            timestamp: String,
            location: String
        }
    ],
    resourceId: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    }
});

export default model('WorshipEventDetails', worshipEventDetails);