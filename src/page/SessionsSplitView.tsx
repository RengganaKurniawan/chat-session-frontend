import { useState } from 'react';
import { Box, CssBaseline} from '@mui/material';
import LeftNav from '../component/LeftNav';
import SessionsList from '../component/SessionsList';
import ChatLayout from '../component/ChatLayout';

// const LOCAL_STORAGE = localStorage.getItem("users");
// var LOGGED_IN_USER_ID: number
// if (LOCAL_STORAGE) {
//   try {
//     const usersObject = JSON.parse(LOCAL_STORAGE);  
//     LOGGED_IN_USER_ID = usersObject.id;
//   } catch (error) {
//      console.error("Error parsing JSON from localStorage:", error);
//   }
// }



interface Session {
  id: number;
  title: string;
  date: string;
  isActive: boolean;
}

const SessionsSplitView = () => {
  const [LOGGED_IN_USER_ID] = useState<number | null>(() => {
    
    try {
      if (typeof window === 'undefined') {
        return null;
      }

      const storedJson = localStorage.getItem("user");

      if (!storedJson) {
        return null;
      }

      const parsedData = JSON.parse(storedJson);

      return parsedData.id || null;
       
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsCompact(true);
  };

  const handleCloseChat = () => {
    setSelectedSession(null); 
    setIsCompact(false);      
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <LeftNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'neutral.100',
          display: 'flex',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Box sx={{
          flex: isCompact ? '0 0 400px' : '1',
          transition: 'flex 0.3s ease-in-out',
          overflow: 'hidden',
          borderRight: isCompact ? '1px solid' : "none",
          borderColor: isCompact ? 'neutral.300' : 'transparent',
        }}>
          <SessionsList
            currentUserId={LOGGED_IN_USER_ID||0}
            onSessionSelect={handleSessionSelect}
            isCompact={isCompact}
            selectedSession={selectedSession}
          />
        </Box>

        {selectedSession && (
            <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                <ChatLayout 
                    key={selectedSession.id} 
                    sessionId={selectedSession.id} 
                    onClose={handleCloseChat}
                />
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default SessionsSplitView;
