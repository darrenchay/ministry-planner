import mongoose from 'mongoose';
import userHandler from './handlers/user-handler';
import eventHandler from './handlers/event-handler';
import resourceHandler from './handlers/resource-handler';
import worshipEventDetailsHandler from './handlers/worship-event-details-handler';
import worshipTemplateHandler from './handlers/worship-template-handler';
import plannerHandler from './handlers/planner-handler';
import roleHandler from './handlers/role-handler';
import emailHandler from './handlers/email-handler';
require('dotenv').config();

export function init(server) {
	const uri = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI_DEV;
    mongoose.connect(uri, {
                        useNewUrlParser : true,
                        useUnifiedTopology : true,
                        useCreateIndex : false
                    });
    mongoose.connection.once('open', () => {
        console.log('MongoDB database connection established successfully!');
    });

	server.use('*', function(req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

    // add endpoints here
	server.use('/api/users', userHandler);
    server.use('/api/events', eventHandler);
    server.use('/api/resources', resourceHandler);
    server.use('/api/worshipEventDetails', worshipEventDetailsHandler);
    server.use('/api/planner', plannerHandler);
    server.use('/api/roles', roleHandler);
    server.use('/api/worshipTemplates', worshipTemplateHandler);
    server.use('/api/email', emailHandler);
}
