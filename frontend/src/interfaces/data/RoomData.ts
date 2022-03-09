// interface
import { Room } from 'interfaces/get/Room';
import { User } from 'interfaces/get/User';

export interface RoomData {
  room: Room,
  last_message: string
  other_user: User
}