import { Box, IconButton, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatMessage from "./ChatMessage";

import aiData from "../data/aiChatData.json";
interface ChatLayoutProps {
    sessionId: number;
    onClose: () => void;
}

function ChatLayout({ sessionId, onClose }: ChatLayoutProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [isAiTyping, setIsAiTyping] = useState(false);

    // autoscroll chat baru
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const session = aiData.sessions.find(s => s.id === sessionId);
        if(session){
            setMessages(session.messages);
        } else {
            setMessages([]);
        }
    }, [sessionId])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isAiTyping]);
    
    const handleSend = () => {
        if (!input.trim()) return;

        const now = new Date();
        const time =
            now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

        const userMsg = {
            id: Date.now(), // simple unique ID
            role: "user",
            text: input.trim(),
            time: time,
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setIsAiTyping(true);

        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                role: "assistant",
                text: "I am a simulated AI. I received your message: " + input, 
                time: time,
            };
            
            setMessages((prev) => [...prev, aiMsg]);
            setIsAiTyping(false);
        }, 1500);
    };

    const currentSessionName = aiData.sessions.find(s => s.id === sessionId)?.name;

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
                    {currentSessionName || "New Chat"}
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
                        senderId={msg.role === "user" ? 1 : 2} 
                        senderName={msg.role === "user" ? "You" : "AI Assistant"}
                        time={msg.time}
                        isOwn={msg.role === "user"}
                    />
                ))}

                {isAiTyping && (
                   <Box sx={{ width: '100%', mb: 2 }}>
                       <Typography variant="caption" color="text.secondary">AI is thinking...</Typography>
                       <LinearProgress sx={{ maxWidth: "200px", mt: 1 }} />
                   </Box>
                )}
                
                <div ref={messagesEndRef} />
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
                        disabled={isAiTyping}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !isAiTyping && handleSend()}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        disabled={isAiTyping || !input.trim()}
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