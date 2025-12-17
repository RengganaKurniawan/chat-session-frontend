import { Routes, Route } from "react-router-dom"; 
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import SessionsSplitView from "./page/SessionsSplitView";
import ProtectedRoute from "./component/ProtectedRoute";
import OutOfScopePage from "./component/OutOfScoped";
import { Navigate } from "react-router-dom";

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
        path="/signup" 
        element={
          <OutOfScopePage 
            pageName="Sign Up Page" 
            showNav={false} 
            backPath="/login" 
          />
        } 
      />
      <Route 
        path="/auth-google" 
        element={
          <OutOfScopePage 
            pageName="Google Sign In" 
            showNav={false} 
            backPath="/login" 
          />
        } 
      />
      <Route 
        path="/auth-microsoft" 
        element={
          <OutOfScopePage 
            pageName="Microsoft Sign In" 
            showNav={false} 
            backPath="/login" 
          />
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
      <Route 
        path="/status" 
        element={
          <ProtectedRoute>
            <OutOfScopePage pageName="Status Page"/>
          </ProtectedRoute>
          } 
      />
      <Route 
        path="/favorite" 
        element={
          <ProtectedRoute>
            <OutOfScopePage pageName="Favorite Page"/>
          </ProtectedRoute>
          } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <OutOfScopePage pageName="Settings Page"/>
          </ProtectedRoute>
          } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <OutOfScopePage pageName="Profile Page"/>
          </ProtectedRoute>
          } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;