import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    authenticated: {
        type: Boolean,
        required: true,
        default: false
    },
    registered: {
        type: Boolean,
        required: true,
        default: false
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
        // default: '',
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
        }
    ],
    ministry: {
        type: String,
    },
    assignedEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'WorshipEventDetails'
        }
    ],
    profileImage: Buffer,
});

export default model('User', userSchema);