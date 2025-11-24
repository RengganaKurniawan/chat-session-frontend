import data from "../data/chatData.json";
import { Link } from "react-router-dom";

function RoomsList() {
  return (
    <ul>
      {data.sessions.map((room) => (
        <li key={room.sessionsId}>
          <Link to={`/rooms/${room.sessionsId}`}>
            {room.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RoomsList;
