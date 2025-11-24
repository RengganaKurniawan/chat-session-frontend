import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import LeftNav from '../component/LeftNav';
import SessionsList from '../component/SessionsList';

interface Session {
  id: number;
  title: string;
  date: string;
  status: string;
}

const SessionsSplitView = () => {
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
          bgcolor: 'background.default',
          p: 3,
          display: 'flex',
          gap: 2,
        }}
      >
        <Box sx={{
          flex: isCompact ? '0 0 300px' : '1',
          transition: 'flex 0.3s ease-in-out',
          overflow: 'hidden',
        }}>
          <SessionsList
            onSessionSelect={handleSessionSelect}
            isCompact={isCompact}
            selectedSession={selectedSession}
          />
        </Box>
        {selectedSession && (
          <Box sx={{ flex: '1' }}>
            {/* <ChatRoomUI session={selectedSession} onClose={handleCloseChat} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SessionsSplitView;
