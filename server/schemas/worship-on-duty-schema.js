import { Schema, model } from 'mongoose';

const worshipOnDutySchema = new Schema({
	id : {
		type : String,
		required : true,
		unique : true
	},
	teamList : [
        {
            roleId : String, 
            personId : String 
        }
    ],
    rehersals : [
        {
            timestamp: String
        }
    ],
    resourceId : {
        type: String,
        required : true
    }
});

export default model('worshipOnDuty', worshipOnDutySchema);