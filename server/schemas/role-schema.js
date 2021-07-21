import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
	id : {
		type : String,
		required : true,
		unique : true
	},
	name : {
		type : String,
		required : true
	},
    description : {
        type : String,
        required : false
    },
    timestamp : {
        type : String,
        required : true
    }
});

export default model('role', roleSchema);