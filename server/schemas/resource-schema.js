import { Schema, model } from 'mongoose';

const resourceSchema = new Schema({
	id : {
		type : String,
		required : true,
		unique : true
	},
	eventId : {
		type : String,
		required : true
	},
	songList : [
        {
            songId: String
        }
    ]
});

export default model('resource', resourceSchema);