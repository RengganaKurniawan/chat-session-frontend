import { Box, Paper, Typography } from "@mui/material";

interface ChatMessageProps {
    text: string;
    senderId: number;
    senderName: string;
    time: string;
    isOwn: boolean
}

function ChatMessage({ 
    text,
    senderName,
    time,
    isOwn,
}: ChatMessageProps) {
    
    return (
        <Box
            display="flex"
            justifyContent={isOwn ? "flex-end" : "flex-start"}
            mb={1.5}
        >
            <Paper
                elevation={2}
                sx={{
                    px: 1.5,
                    py: 0.5,
                    maxWidth: "70%",
                    minWidth: "150px",
                    bgcolor: isOwn ? "#DCF8C6" : "#ffffff",
                    borderRadius: 2,
                }}
            >
                {/* sender name */}
                <Typography 
                    variant="caption"
                    sx={{
                        display: "block",
                        textAlign: "left",
                        color: "text.secondary",
                        fontWeight: 600,
                        mb: 0.2,
                    }}
                >
                    {senderName}
                </Typography>

                {/* message text */}
                <Typography 
                    variant="body2" 
                    sx={{ 
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.2,

                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                    }}>
                    {text}
                </Typography>

                {/* time */}
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.2,
                        color: "text.disabled",
                        fontSize: "0.7rem",
                    }}
                    >
                    {time}
                </Typography>
            </Paper>

        </Box>
    )
}

export default ChatMessage;