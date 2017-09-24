// @flow
import * as handlers from './handlers';

import {
	RoomModel,
	RoomModelRequired
} from './db/model';

const routes = [
	{
		method: 'GET',
		path: '/rooms',
		handler: handlers.getAllRooms
	},
	{
		method: 'GET',
		path: '/rooms/{roomId}',
		handler: handlers.getRoom
	},
	{
		method: 'POST',
		path: '/rooms',
		handler: handlers.createRoom,
		config: {
			validate: {
				payload: RoomModelRequired
			}
		}
	},
	{
		method: 'PUT',
    path: '/rooms/{roomId}',
    handler: handlers.putRoom,
		config: {
			validate: {
				payload: RoomModelRequired
			}
		}
	},
	{
		method: 'PATCH',
    path: '/rooms/{roomId}',
    handler: handlers.patchRoom,
		config: {
			validate: {
				payload: RoomModel
			}
		}
	},
	{
		method: 'DELETE',
		path: '/rooms/{roomId}',
		handler: handlers.delelteRoom
	}
]

export default routes;
