import { Box, IconButton, Paper, TextField, Typography, InputAdornment } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ChatMessage from "./ChatMessage";
import AvailableActions from "./AvailableActions";

import chatData from "../data/chatData.json";
import usersData from "../data/users.json";

// implement sama login
const LOGGED_IN_USER_ID = 1;

interface ChatLayoutProps {
    sessionId: number;
    onClose: () => void;
}

function ChatLayout({ sessionId, onClose }: ChatLayoutProps) {
    // contoh chat room 1
    const session = chatData.sessions.find(s => s.sessionsId === sessionId);

    const initialMessages = 
        session?.messages.map(m => {
            const sender = usersData.users.find(u => u.id === m.senderId);

            return {
                id: m.id,
                text: m.text,
                time: m.time,
                senderId: m.senderId,
                senderName: sender?.name || "Unknown",
                isOwn: m.senderId === LOGGED_IN_USER_ID,
                likes: m.likes,
                dislikes: m.dislikes,
            }
        }) || [];

    const [messages, setMessages] = useState(initialMessages);
    const [ input, setInput ] = useState("")
    const [showActions, setShowActions] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const now = new Date();
        const time =
            now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

        const newMessage = {
            id: messages.length + 1,
            text: input.trim(),
            time,
            senderId: LOGGED_IN_USER_ID,
            senderName: usersData.users.find(u => u.id === LOGGED_IN_USER_ID)?.name || "Me",
            isOwn: true,
            likes: 0,
            dislikes: 0,
        };

        setMessages([...messages, newMessage]);
        setInput("");
    };

    const handleSelectAction = (action: string) => {
        setInput(action);
        setShowActions(false);
    };

    const handleFileUpload = (fileName: string) => {
        setInput(fileName);
        setShowActions(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
        >
            {/* header */}
            <Paper
                square
                elevation={1}
                sx={{
                    p: 2,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    {session?.name || "Session"}
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Paper>

            {/* main chat */}
            <Box
                flex={1}
                overflow="auto"
                p={2}
                display="flex"
                flexDirection="column"
            >
                {messages.map((msg) => (
                    <ChatMessage 
                        key={msg.id} 
                        text={msg.text}
                        senderId={msg.senderId} 
                        senderName={msg.senderName}
                        time={msg.time}
                        isOwn={msg.isOwn}
                        likes={msg.likes || 0}
                        dislikes={msg.dislikes || 0}
                    />
                ))}
            </Box>
            
            {/* input box */}
            <Paper
                square
                sx={{
                    p: 1.5,
                    position: "sticky",
                    bottom: 0,
                }}
            >
                {showActions && (
                    <AvailableActions
                        onClose={() => setShowActions(false)}
                        onSelectAction={handleSelectAction}
                        onFileUpload={handleFileUpload}
                    />
                )}
                <Box display="flex" gap={1}>
                    <TextField
                        fullWidth
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': {
                                    borderColor: '#e0e0e0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#c0c0c0',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#a0a0a0',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={() => setShowActions(!showActions)}>
                                        {showActions ? <CloseIcon /> : <AddIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        sx={{ width: 50, height: 50 }}
                    >
                        <SendIcon />
                    </IconButton>                    
                </Box>
            </Paper>
            
        </Box>
    )
}

export default ChatLayout;