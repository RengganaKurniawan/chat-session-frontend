import { Routes, Route } from "react-router-dom"; 
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import SessionsSplitView from "./page/SessionsSplitView";
import ProtectedRoute from "./component/ProtectedRoute";

function App(){
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <LoginPage />
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/sessions" 
        element={
          <ProtectedRoute>
            <SessionsSplitView />
          </ProtectedRoute>
          } 
        />
    </Routes>
  )
}

export default App;