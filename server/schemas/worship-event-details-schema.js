import { Schema, model } from 'mongoose';

const worshipEventDetails = new Schema({
    eventId: {
        type: String,
        required: true
    },
    worshipLeader: {
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
                    tag: String,
                    status: { // accepted, reject, pending statuses
                        type: String,
                        default: 'pending'
                    }
                }
            ]
        }
    ],
    rehearsals: [
        {
            type: String,
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