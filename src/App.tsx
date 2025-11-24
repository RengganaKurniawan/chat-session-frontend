import { Routes, Route } from "react-router-dom"; 
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import RoomsList from "./page/RoomList";
import RoomChat from "./page/RoomChat";
import SessionsSplitView from "./page/SessionsSplitView";


function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      
      {/* test */}
      <Route path="/roomList" element={<RoomsList />} />
      <Route path="/rooms/:roomId" element={<RoomChat />} />
      
      <Route path="/sessions" element={<SessionsSplitView />} />
    </Routes>
  )
}

export default App;