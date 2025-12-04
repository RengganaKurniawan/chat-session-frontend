import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import aiChatData from "../data/aiChatData.json";

const DefaultSortIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 4v12l-4-4m4 4 4-4"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 20V8l4 4m-4-4-4 4"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Session {
  id: number;
  title: string;
  date: string;
  isActive: boolean;
  userId?: number;
}

interface SessionsListProps {
  onSessionSelect: (session: Session) => void;
  isCompact: boolean;
  selectedSession: Session | null;
  currentUserId: number;
}

function SessionsList({ onSessionSelect, isCompact, selectedSession, currentUserId }: SessionsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSortBy] = useState("default");

  // Filter state
  const [titleFilter, setTitleFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  // Filter anchors
  const [titleAnchor, setTitleAnchor] = useState<HTMLElement | null>(null);
  const [dateAnchor, setDateAnchor] = useState<HTMLElement | null>(null);
  const [statusAnchor, setStatusAnchor] = useState<HTMLElement | null>(null);
  
  // Sessions
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    const userSpecificData = aiChatData.sessions.filter(
        (s) => s.userId === currentUserId
    );

    const formattedSessions = userSpecificData.map((s) => ({
        id: s.id,
        title: s.name,
        date: s.date || new Date().toLocaleDateString(), 
        isActive: s.isActive !== undefined ? s.isActive : true,
        userId: s.userId
    }));

    setSessions(formattedSessions);

    setTitleFilter([]); 
  }, [currentUserId]);

  // ADD SESSION 
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAddSession = () => {
    if (!newTitle.trim()) return;

    const newSession: Session = {
      id: sessions.length + 1,
      title: newTitle,
      date: new Date().toLocaleDateString(),
      isActive: true,
      userId: currentUserId,
    };

    setSessions([...sessions, newSession]);
    setNewTitle("");
    setOpenDialog(false);
  };

  // filters masing2 kolom
  const uniqueTitles = [...new Set(sessions.map((s) => s.title))];
  const uniqueDates = [...new Set(sessions.map((s) => s.date))];
 
  const toggleFilter = (value: string, filterArray: string[], setFilter: (arr: string[]) => void) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter((v) => v !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  // default button
  const resetFilters = () => {
    setTitleFilter([]);
    setDateFilter([]);
    setStatusFilter([]);
    setSearchQuery("");
    setSortBy("default");
  };

  
  let filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTitle = titleFilter.length === 0 || titleFilter.includes(session.title);
    const matchesDate = dateFilter.length === 0 || dateFilter.includes(session.date);

    const statusString = session.isActive ? "Active" : "Inactive"
    const mathchesStatus = statusFilter.length === 0 || statusFilter.includes(statusString)

    return matchesSearch && matchesTitle && matchesDate && mathchesStatus;
  });

  return (
      <Box sx={{ minHeight: "100vh", bgcolor: "white", p: 4, flexGrow: 1 }}>

        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid white"
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Chat Sessions
          </Typography>

          <IconButton
            sx={{ border: "2px solid #000" }}
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon sx={{ color: "#000" }} />
          </IconButton>
        </Box>

       {/* search input */}
        <Box sx={{ p: 3, borderBottom: "1px solid white" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")} size="small">
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            display: "flex",
            gap: 2,
            alignItems: "center"
          }}
        >
          <Button
            onClick={resetFilters}
            sx={{
              textTransform: "none",
              borderRadius: "40px",
              px: 2.5,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: "1px solid white",
              bgcolor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)"
            }}
          >
            <DefaultSortIcon />
            <Typography fontWeight={500}>Default</Typography>
          </Button>
        </Box>

        
        <Table>
          <TableHead sx={{ bgcolor: "white" }}>
            <TableRow>

              
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography fontWeight={600}>Title</Typography>

                  <IconButton
                    size="small"
                    onClick={(e) => setTitleAnchor(e.currentTarget)}
                    sx={{ color: titleFilter.length > 0 ? "primary.main" : "inherit" }}
                  >
                    <FilterAltOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
              {!isCompact && (
              <>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography fontWeight={600}>Date</Typography>

                    <IconButton
                      size="small"
                      onClick={(e) => setDateAnchor(e.currentTarget)}
                      sx={{ color: dateFilter.length > 0 ? "primary.main" : "inherit" }}
                    >
                      <FilterAltOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography fontWeight={600}>Status</Typography>

                    <IconButton
                      size="small"
                      onClick={(e) => setStatusAnchor(e.currentTarget)}
                      sx={{ color: statusFilter.length > 0 ? "primary.main" : "inherit" }}
                    >
                      <FilterAltOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredSessions.map((session) => (
              <TableRow
                key={session.id}
                hover
                onClick={() => onSessionSelect(session)}
                selected={selectedSession ? selectedSession.id === session.id : false}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{session.title}</TableCell>
                {!isCompact && (
                  <>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.isActive ? "Active" : "Inactive"}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

      <Menu
        anchorEl={titleAnchor}
        open={Boolean(titleAnchor)}
        onClose={() => setTitleAnchor(null)}
      >
        {uniqueTitles.map((title) => (
          <MenuItem
            key={title}
            onClick={() => toggleFilter(title, titleFilter, setTitleFilter)}
            sx={{ bgcolor: titleFilter.includes(title) ? "action.selected" : "inherit" }}
          >
            {title}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={dateAnchor}
        open={Boolean(dateAnchor)}
        onClose={() => setDateAnchor(null)}
      >
        {uniqueDates.map((date) => (
          <MenuItem
            key={date}
            onClick={() => toggleFilter(date, dateFilter, setDateFilter)}
            sx={{ bgcolor: dateFilter.includes(date) ? "action.selected" : "inherit" }}
          >
            {date}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={statusAnchor}
        open={Boolean(statusAnchor)}
        onClose={() => setStatusAnchor(null)}
      >
        {["Active", "Inactive"].map((status) => (
          <MenuItem
            key={status}
            onClick={() => toggleFilter(status, statusFilter, setStatusFilter)}
            sx={{ bgcolor: statusFilter.includes(status) ? "action.selected" : "inherit" }}
          >
            {status}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Chat Session</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Session Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSession}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
   
  );
}

export default SessionsList;