import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	id : {
		type : String,
		required : true,
		unique: true
	},
	firstname : {
		type : String,
		required : true
	},
	lastname : {
		type : String,
		required : true
	},
    email : {
        type : String,
        required : true,
		unique: true
    },
	password : {
		type : String,
		required : true,
		min : 8,
		max : 40
	},
	phoneNumber : {
		type : Number,
		required : false
	},
    role : {
        type : String,
        required : true
    }, 
    ministry : {
        type : String,
        required : true
    }
});

export default model('user', userSchema);