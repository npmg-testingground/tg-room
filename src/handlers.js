// @flow
import env from './env.config';
import Boom from 'boom';
import r from './db/config';

// Types
import type { RoomPayloadType } from './db/model';
export type ReplyFunctionType = (_: (string | {})) => string;

export function getAllRooms(_request, reply: ReplyFunctionType) {
	r.table(env.DB_TABLE_NAME).then(result => {
		reply(result);
	}).catch(err => {
		reply(Boom.badImplementation(err))
	});
}

export function getRoom(request: Object, reply: ReplyFunctionType) {
	const { roomId } : {
    roomId: string
  } = request.params;
	r.table(env.DB_TABLE_NAME).get(roomId).then(result => {
		reply(result);
	}).catch(err => {
		reply(Boom.badImplementation(err))
	});
}

export async function createRoom(request: Object, reply: ReplyFunctionType): void {
	const { payload }: {
    payload: RoomPayloadType
  } = request;
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
export function putRoom(request: Object, reply: ReplyFunctionType) {
	const { roomId }: { roomId: string } = request.params;
	const { payload }: {
    payload: RoomPayloadType
  } = request;
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
export function patchRoom(request: Object, reply: ReplyFunctionType) {
	const { roomId } : {roomId: string} = request.params;
	const { payload }: {
    payload: RoomPayloadType
  } = request;
	r.table(env.DB_TABLE_NAME)
		.get(roomId)
		.update(payload, {returnChanges: true})
		.then(changes => {
				reply(changes)
		})
		.catch(err => {
				reply(Boom.badImplementation(err))
		});
}

export function delelteRoom(request: Object, reply: ReplyFunctionType) {
	const { roomId }: { roomId: string } = request.params;
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