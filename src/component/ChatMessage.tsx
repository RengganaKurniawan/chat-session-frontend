import { Box, Paper, Typography } from "@mui/material";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

function ChatMessage({ role, content }: ChatMessageProps) {
    const isUser = role === "user";
    
    return (
        <Box
            display="flex"
            justifyContent={isUser ? "flex-end" : "flex-start"}
            mb={1.5}
        >
            <Paper
                elevation={1}
                sx={{
                    p: 1.5,
                    maxWidth: "70%",
                    bgcolor: isUser ? "primary.main" : "grey.200",
                    color: isUser ? "white" : "black",
                    borderRadius: 2,
                }}
            >
                <Typography variant="body1">{content}</Typography>
            </Paper>

        </Box>
    )
}

export default ChatMessage;