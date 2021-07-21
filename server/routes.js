import { connection } from './db/db';
import userHandler from './handlers/user-handler';
import eventHandler from './handlers/event-handler';
import resourceHandler from './handlers/resource-handler';
import worshipOnDutyHandler from './handlers/worship-on-duty-handler';

export function init(server) {
	connection(); // creates database connection

	server.use('*', function(req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

    // add endpoints here
	server.use('/api/users', userHandler);
    server.use('/api/events', eventHandler);
    server.use('/api/resources', resourceHandler);
    server.use('/api/worshipOnDuty', worshipOnDutyHandler);
}
