import { connection } from './db/db';
import userHandler from './handlers/user-handler';

export function init(server) {
	connection(); // creates database connection

	server.use('*', function(req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

    // add endpoints here
	server.use('/api/users', userHandler);
    // server.use('/api/foo', fooHandler);
    // server.use('/api/bar', barHandler);
}
