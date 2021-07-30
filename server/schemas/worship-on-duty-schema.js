import { Schema, model } from 'mongoose';

const worshipOnDutySchema = new Schema({
	id : {
		type : String,
		required : true,
		unique : true
	},
    eventId : {
        type : String,
        required : true
    },
	teamList : [
        {
            roleId : String, 
            personId : String 
        }
    ],
    rehearsals : [
        {
            timestamp: String,
            location: String
        }
    ],
    resourceId : {
        type: String,
        required : true
    }
});

export default model('worshipOnDuty', worshipOnDutySchema);