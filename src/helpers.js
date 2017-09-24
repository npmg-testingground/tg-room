// @flow
import env from './env.config';
import r from './db/config';

export function checkIfRoomExists(room) {
  return r.table(env.DB_TABLE_NAME)
  .filter(room)
  .count()
  .eq(1)
}
