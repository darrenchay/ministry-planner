import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	firstname : {
		type : String,
		required : true,
		unique : true
	},
	lastname : {
		type : String,
		required : true,
		unique : true
	},
    email : {
        type : String,
        required : true
    },
	password : {
		type : String,
		required : true,
		min : 8,
		max : 40
	},
    role : {
        type : String,
        required : true
    }
});

export default model('user', userSchema);