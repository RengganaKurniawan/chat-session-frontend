import { Routes, Route } from "react-router-dom"; 
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import SessionsSplitView from "./page/SessionsSplitView";


function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/sessions" element={<SessionsSplitView />} />
    </Routes>
  )
}

export default App;