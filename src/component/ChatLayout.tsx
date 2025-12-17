import { Box, IconButton, LinearProgress, Paper, TextField, Typography, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ChatMessage from "./ChatMessage";
import AvailableActions from "./AvailableActions";

import aiData from "../data/aiChatData.json";
interface ChatLayoutProps {
    sessionId: number;
    sessionName?: string;
    onClose: () => void;
    initialMessage?: string;
}

function ChatLayout({ sessionId, sessionName, onClose, initialMessage }: ChatLayoutProps) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState(initialMessage || "");
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [showActions, setShowActions] = useState(false);

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

    useEffect(() => {
        if (initialMessage) {
            setInput(initialMessage);
        }
    }, [initialMessage]);
    
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
            isOwn: true,
            likes: 0,
            dislikes: 0,
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

    const currentSessionName = sessionName || aiData.sessions.find(s => s.id === sessionId)?.name;    const handleSelectAction = (action: string) => {
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
                    bgcolor: 'white',
                }}
            >
                <Typography variant="h6" fontWeight="bold" color="neutral.800">
                    {currentSessionName || "New Chat"}
                </Typography>

                <IconButton onClick={onClose} sx={{ color: 'neutral.500' }}>
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
                bgcolor="neutral.100"
            >
                {messages.map((msg) => (
                    <ChatMessage 
                        key={msg.id} 
                        text={msg.text}
                        senderId={msg.role === "user" ? 1 : 2} 
                        senderName={msg.role === "user" ? "You" : "AI Assistant"}
                        time={msg.time}
                        isOwn={msg.role === "user"}
                        likes={msg.likes || 0}
                        dislikes={msg.dislikes || 0}
                    />
                ))}

                {isAiTyping && (
                   <Box sx={{ width: '100%', mb: 2 }}>
                       <Typography variant="caption" color="neutral.500">AI is thinking...</Typography>
                       <LinearProgress color="primary" sx={{ maxWidth: "200px", mt: 1 }} />
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
                    bgcolor: 'white',
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
                        disabled={isAiTyping}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !isAiTyping && handleSend()}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': {
                                    borderColor: 'neutral.300',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'neutral.500',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={() => setShowActions(!showActions)} sx={{ color: 'neutral.500' }}>
                                        {showActions ? <CloseIcon /> : <AddIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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