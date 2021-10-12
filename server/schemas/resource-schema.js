import { Schema, model } from 'mongoose';

const resourceSchema = new Schema({
	eventDetailsId : {
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