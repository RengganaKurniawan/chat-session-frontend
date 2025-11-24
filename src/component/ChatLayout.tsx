import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";

interface Message {
    role: "assistant" | "user";
    content: string;
}

function ChatLayout() {
    const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
    const [ input, setInput ] = useState("")

    const handleSend = () => {
        if(!input.trim()) return;

        setMessages([...messages, { role: "user", content: input.trim() }]);
        setInput("");
    }

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
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Session Name
                </Typography>
            </Paper>

            {/* main chat */}
            <Box
                flex={1}
                overflow="auto"
                p={2}
                display="flex"
                flexDirection="column"
            >
                {messages.map((msg, i) => (
                    <ChatMessage key={i} role={msg.role} content={msg.content} />
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
                <Box display="flex" gap={1}>
                    <TextField
                        fullWidth
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
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