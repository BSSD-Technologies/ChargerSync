/**
 * Room
 * @uuid Unique ID for course object;
 * @room_id Room ID with building code and room number;
 * @max_capacity Maximum number of students allowed in the room;
 */
export type Room = {
  uuid: string;
  room_id: string;
  max_capacity: number;
};

export const defaultRoom = {
  room_id: "",
  max_capacity: NaN,
};

export type ExportRoom = {
  "Room ID": string;
  "Max Capacity": number;
};