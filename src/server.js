// @flow
import Hapi from 'hapi'
import env from './env.config';
import routes from './routes';

const server: Object = new Hapi.Server();
server.connection({
	port: env.SERVICE_PORT
});

server.route(routes);
if (!module.parent) {
  server.start((err: string) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
}

module.exports = server;
