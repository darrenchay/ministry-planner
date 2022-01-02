import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    authId: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 40
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    role: [
        {
            type: String,
            required: true
        }
    ],
    ministry: {
        type: String,
        required: true
    },
    assignedEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'WorshipEventDetails'
        }
    ]
});

export default model('User', userSchema);