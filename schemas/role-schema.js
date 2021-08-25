import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
	name : {
		type : String,
		required : true
	},
    description : {
        type : String,
        required : false
    },
    ministry : {
        type : String,
        required : true 
    }
});

export default model('Role', roleSchema);