import { useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import LeftNav from '../component/LeftNav';
import SessionsList from '../component/SessionsList';
import ChatLayout from '../component/ChatLayout';

interface Session {
  id: number;
  title: string;
  date: string;
  isActive: boolean;
}

const SessionsSplitView = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setIsCompact(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <LeftNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          display: 'flex',
          gap: 2,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Box sx={{
          flex: isCompact ? '0 0 400px' : '1',
          transition: 'flex 0.3s ease-in-out',
          overflow: 'hidden',
          borderRight: '1px solid #e0e0e0'
        }}>
          <SessionsList
            onSessionSelect={handleSessionSelect}
            isCompact={isCompact}
            selectedSession={selectedSession}
          />
        </Box>

        <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {selectedSession ? (
                <ChatLayout 
                    key={selectedSession.id} 
                    sessionId={selectedSession.id} 
                />
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                     <Typography color="text.secondary">Select a session to start chatting</Typography>
                </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default SessionsSplitView;
