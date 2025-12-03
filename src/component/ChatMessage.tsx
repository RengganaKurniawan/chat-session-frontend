import { Box, Paper, Typography, Link } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

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
                    "& img": { maxWidth: "100%" },
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
                <Box
                    sx={{
                        "& p": { margin: 0 },
                        color: "text.primary",
                        fontSize: "0.875rem",
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        "& .katex": { fontSize: "1.1em" },
                    }}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            a: ({ href, children}) => (
                                <Link 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    underline="hover"
                                    color="primary"
                                >
                                    {children}
                                </Link>
                            ),
                            p: ({children}) => (
                                <Typography variant="body2" component="p">
                                    {children}
                                </Typography>
                            ),
                        }}
                    >
                        {text}
                    </ReactMarkdown>

                </Box>

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