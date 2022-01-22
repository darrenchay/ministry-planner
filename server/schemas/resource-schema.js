import { Schema, model } from 'mongoose';

const resourceSchema = new Schema({
	eventDetailsId : {
		type : String,
		required : true
	},
	sections: [
		{
			title: String,
			songs: [
				{
					title: String,
					artist: String,
					key: String,
					bpm: Number,
					timeSig: String,
					link: String,
					notes: String,
					lyrics: String,
					songRef: String
				}
			]
		}
	],
	comments: [
		{
			commentId: String,
			user: String,
			comment: String,
			timestamp : {
				type : String,
				required : true
			},
		}
	]
});

export default model('Resource', resourceSchema);