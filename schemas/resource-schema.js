import { Schema, model } from 'mongoose';

const resourceSchema = new Schema({
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

export default model('Resource', resourceSchema);