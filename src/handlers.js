// @flow
import env from './env.config';
import Boom from 'boom';
import r from './db/config';
import { checkIfRoomExists } from './helpers';

export function getAllRooms(_request, reply) {
	r.table(env.DB_TABLE_NAME).then(result => {
		reply(result);
	}).catch(err => {
		reply(Boom.badImplementation(err))
	});
}

export function getRoom(request, reply) {
	const { roomId } = request.params;
	r.table(env.DB_TABLE_NAME).get(roomId).then(result => {
		reply(result);
	}).catch(err => {
		reply(Boom.badImplementation(err))
	});
}

export async function createRoom(request, reply) {
	const { payload } = request;
  const roomExists = await checkIfRoomExists(payload);
  if (roomExists) {
    reply(Boom.badData("There is already a room with these parameters!"))
  }
	r.table(env.DB_TABLE_NAME).insert(
    r.expr(payload).merge({
      createdAt: r.now()
    }),
    // This tells rethinkdb that changes should be return
    {returnChanges: true}
  )
  .then(result => {
    reply(result)
  })
  .catch(err => {
    reply(Boom.badImplementation(err))
  });
}

/**
 * Change the whole object in the database,
 * you should pass the every property of the
 * object you want to change
 */
export function putRoom(request, reply) {
	const { roomId } = request.params;
	const { payload } = request;
	payload.id = roomId;
	r.table(env.DB_TABLE_NAME)
    .get(roomId)
    .replace(payload, {returnChanges: true})
    .then(changes => {
      reply(changes)
    })
    .catch(err => {
      reply(Boom.badImplementation(err))
    });
}

/**
 * Change part of the object in the database,
 * you should pass only the properties 
 * you want to be changed
 */
export function patchRoom(request, reply) {
	const { roomId } = request.params;
	const { payload } = request;
  
	r.table(env.DB_TABLE_NAME)
		.get(roomId)
		.update(payload, {returnChanges: 'always'})
		.then(changes => {
				reply(changes)
		})
		.catch(err => {
				reply(Boom.badImplementation(err))
		});
}

export function delelteRoom(request, reply) {
	const { roomId } = request.params;
	r.table(env.DB_TABLE_NAME)
		.get(roomId)
		.delete({returnChanges: true})
		.then(changes => {
				reply(changes)
		})
		.catch(err => {
				reply(Boom.badImplementation(err))
		});
}