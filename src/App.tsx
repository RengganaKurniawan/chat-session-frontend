import { Routes, Route } from "react-router-dom"; 
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import SessionsPage from "./page/SessionsPage";
import RoomsList from "./page/RoomList";
import RoomChat from "./page/RoomChat";

function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
      
      {/* test */}
      <Route path="/roomList" element={<RoomsList />} />
      <Route path="/rooms/:roomId" element={<RoomChat />} />
    </Routes>
  )
}

export default App;