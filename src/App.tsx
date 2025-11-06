import { Routes, Route } from "react-router-dom"; 
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import SessionsPage from "./page/SessionsPage";

function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/Sessions" element={<SessionsPage />} />
    </Routes>
  )
}

export default App;