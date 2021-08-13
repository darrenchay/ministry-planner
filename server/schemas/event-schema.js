import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
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
    },
	type : {
		type : String,
		required : true
	},
	eventDetailsId : {
		type : String,
		required : true
	}
});

export default model('Event', eventSchema);