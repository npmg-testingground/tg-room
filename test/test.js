import test from 'ava';
import server from '../src/server';

const requestDefaults = {
  method: 'GET',
  url: '/rooms'
};

test('endpoint test | GET /rooms | valid request -> 200 OK', t => {
  const request = Object.assign({}, requestDefaults);

  return server.inject(request)
    .then(response => {
      t.is(response.statusCode, 200, 'Everything cool!');
    });
});

