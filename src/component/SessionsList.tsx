import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
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
  DialogActions,
  Pagination
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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

type SortColumn = "title" | "date" | "status" | null;
type SortOrder = "asc" | "desc" | null;

function SessionsList({ onSessionSelect, isCompact, selectedSession, currentUserId }: SessionsListProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchTitleQuery, setSearchTitleQuery] = useState("");
  const [searchDateQuery, setSearchDateQuery] = useState("");
  const [searchStatusQuery, setSearchStatusQuery] = useState("");

  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // Load sessions
  useEffect(() => {
    const userSpecificData = aiChatData.sessions.filter((s) => s.userId === currentUserId);
    const formattedSessions = userSpecificData.map((s) => ({
      id: s.id,
      title: s.name,
      date: s.date || new Date().toLocaleDateString(),
      isActive: s.isActive !== undefined ? s.isActive : true,
      userId: s.userId
    }));
    setSessions(formattedSessions);
  }, [currentUserId]);

  const handleAddSession = () => {
    if (!newTitle.trim()) return;

    const newSession: Session = {
      id: sessions.length + 1,
      title: newTitle,
      date: new Date().toLocaleDateString(),
      isActive: true,
      userId: currentUserId
    };

    setSessions([...sessions, newSession]);
    setNewTitle("");
    setOpenDialog(false);
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const resetFilters = () => {
    setSearchTitleQuery("");
    setSearchDateQuery("");
    setSearchStatusQuery("");
    setSortColumn(null);
    setSortOrder(null);
    setPage(1);
  };

  // Filter sessions
  let filteredSessions = sessions.filter((session) => {
    const matchesTitle = session.title.toLowerCase().includes(searchTitleQuery.toLowerCase());
    const matchesDate = session.date.toLowerCase().includes(searchDateQuery.toLowerCase());
    const statusString = session.isActive ? "Active" : "Inactive";
    const matchesStatus = statusString.toLowerCase().includes(searchStatusQuery.toLowerCase());
    return matchesTitle && matchesDate && matchesStatus;
  });

  // Sorting
  if (sortColumn && sortOrder) {
    filteredSessions.sort((a, b) => {
      let compareValue = 0;
      if (sortColumn === "title") compareValue = a.title.localeCompare(b.title);
      else if (sortColumn === "date") compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortColumn === "status") compareValue = (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0);

      return sortOrder === "asc" ? compareValue : -compareValue;
    });
  }

  const totalPages = Math.ceil(filteredSessions.length / rowsPerPage);
  const paginatedSessions = filteredSessions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white", p: 4, flexGrow: 1 }}>
      <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid white" }}>
        <Typography variant="h6" fontWeight={600}>Chat Sessions</Typography>
        <IconButton sx={{ border: "2px solid #000" }} onClick={() => setOpenDialog(true)}>
          <AddIcon sx={{ color: "#000" }} />
        </IconButton>
      </Box>

      {/* Search Filters */}
      <Box sx={{ p: 2, borderBottom: "1px solid", display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        <Button onClick={resetFilters} sx={{ textTransform: "none", borderRadius: "40px", px: 2.5, py: 1, display: "flex", alignItems: "center", gap: 1, border: "1px solid white", bgcolor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>
          <DefaultSortIcon />
          <Typography fontWeight={500}>Default</Typography>
        </Button>

        <TextField
          variant="outlined"
          placeholder="Search by title..."
          value={searchTitleQuery}
          onChange={(e) => setSearchTitleQuery(e.target.value)}
          size="small"
          sx={{ minWidth: "200px", "& .MuiOutlinedInput-root": { borderRadius: "40px" } }}
          InputProps={{
            endAdornment: searchTitleQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTitleQuery("")} size="small"><CloseIcon fontSize="small" /></IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          variant="outlined"
          placeholder="Search by date..."
          value={searchDateQuery}
          onChange={(e) => setSearchDateQuery(e.target.value)}
          size="small"
          sx={{ minWidth: "200px", "& .MuiOutlinedInput-root": { borderRadius: "40px" } }}
          InputProps={{
            endAdornment: searchDateQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchDateQuery("")} size="small"><CloseIcon fontSize="small" /></IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          variant="outlined"
          placeholder="Search by status..."
          value={searchStatusQuery}
          onChange={(e) => setSearchStatusQuery(e.target.value)}
          size="small"
          sx={{ minWidth: "200px", "& .MuiOutlinedInput-root": { borderRadius: "40px" } }}
          InputProps={{
            endAdornment: searchStatusQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchStatusQuery("")} size="small"><CloseIcon fontSize="small" /></IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Table>
        <TableHead sx={{ bgcolor: "white" }}>
          <TableRow>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => handleSort("title")}>
                <Typography fontWeight={600}>Title</Typography>
                {sortColumn !== "title" && <DefaultSortIcon />}
                {sortColumn === "title" && sortOrder === "asc" && <ArrowUpwardIcon fontSize="small" />}
                {sortColumn === "title" && sortOrder === "desc" && <ArrowDownwardIcon fontSize="small" />}
              </Box>
            </TableCell>
            {!isCompact && (
              <>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => handleSort("date")}>
                    <Typography fontWeight={600}>Date</Typography>
                    {sortColumn !== "date" && <DefaultSortIcon />}
                    {sortColumn === "date" && sortOrder === "asc" && <ArrowUpwardIcon fontSize="small" />}
                    {sortColumn === "date" && sortOrder === "desc" && <ArrowDownwardIcon fontSize="small" />}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => handleSort("status")}>
                    <Typography fontWeight={600}>Status</Typography>
                    {sortColumn !== "status" && <DefaultSortIcon />}
                    {sortColumn === "status" && sortOrder === "asc" && <ArrowUpwardIcon fontSize="small" />}
                    {sortColumn === "status" && sortOrder === "desc" && <ArrowDownwardIcon fontSize="small" />}
                  </Box>
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedSessions.map((session) => (
            <TableRow key={session.id} hover onClick={() => onSessionSelect(session)} selected={selectedSession?.id === session.id} sx={{ cursor: "pointer" }}>
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

      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Chat Session</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth margin="dense" label="Session Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSession}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SessionsList;
