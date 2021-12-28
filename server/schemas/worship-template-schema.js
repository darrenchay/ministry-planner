import { Schema, model } from 'mongoose';

const worshipTemplate = new Schema({
    colorId: {
        type: String
    },
    teamName: {
        type: String,
        required: true
    },
    worshipLeader: {
        type: String,
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
    ]
});

export default model('worshipTemplate', worshipTemplate);