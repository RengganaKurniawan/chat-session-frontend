import { useParams } from "react-router-dom";
import data from "../data/chatData.json";

function RoomChat() {
  const { roomId } = useParams();
  const room = data.rooms.find(r => r.roomId === Number(roomId));

  if (!room) return <p>Room not found.</p>;

  return (
    <div>
      <h2>{room.name}</h2>

      <div>
        {room.messages.map(msg => (
          <p key={msg.id}>
            <strong>User {msg.senderId}: </strong>
            {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default RoomChat
