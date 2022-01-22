import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    timestamp: {
        type: String,
        required: true
    },
    eventDetails: [
        {
            eventDetailsId: String,
            eventType: String
        }
    ],
    serviceType: {
        type: String,
        required: true
    }
});

export default model('Event', eventSchema);