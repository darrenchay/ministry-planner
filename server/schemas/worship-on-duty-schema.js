import { Schema, model } from 'mongoose';

const worshipOnDutySchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    eventId: {
        type: String,
        required: true
    },
    teamList: [
        {
            roleId: String,
            person: [
                {
                    Id: String,
                    tag: String, //worship Leader, lead vocal etc
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
    }
});

export default model('worshipOnDuty', worshipOnDutySchema);