import data from "../data/chatData.json";
import { Link } from "react-router-dom";

function RoomsList() {
  return (
    <ul>
      {data.rooms.map((room) => (
        <li key={room.roomId}>
          <Link to={`/rooms/${room.roomId}`}>
            {room.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RoomsList;
