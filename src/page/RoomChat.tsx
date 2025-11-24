import { useParams } from "react-router-dom";
import data from "../data/chatData.json";

function RoomChat() {
  const { sessionsId } = useParams();
  const room = data.sessions.find(r => r.sessionsId === Number(sessionsId));

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
