// @flow
import env from './env.config';
import r from './db/config';

import type { RoomPayloadType } from './db/model';

export function checkIfRoomExists(room: RoomPayloadType): bool {
  return r.table(env.DB_TABLE_NAME)
  .filter(room)
  .count()
  .eq(1)
}
