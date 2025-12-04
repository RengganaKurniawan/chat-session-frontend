import { Box, Paper, Typography, IconButton, Menu, MenuItem, useTheme, Link } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface ChatMessageProps {
    text: string;
    senderId: number;
    senderName: string;
    time: string;
    isOwn: boolean;
    likes: number;
    dislikes: number;
}

function ChatMessage({ 
    text,
    senderName,
    time,
    isOwn,
    likes,
    dislikes,
}: ChatMessageProps) {
    const theme = useTheme();
    const [reaction, setReaction] = useState<'up' | 'down' | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (likes > 0) {
            setReaction('up');
        } else if (dislikes > 0) {
            setReaction('down');
        } else {
            setReaction(null);
        }
    }, [likes, dislikes]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        handleMenuClose();
    };

    const handleReaction = (newReaction: 'up' | 'down') => {
        if (reaction === newReaction) {
            setReaction(null);
        } else {
            setReaction(newReaction);
        }
        handleMenuClose();
    };
    
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
                    position: 'relative',
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <IconButton size="small" onClick={handleMenuClick}>
                        <MoreVertIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleCopy}>
                            <ContentCopyIcon sx={{ fontSize: 16, mr: 1 }} />
                            Copy
                        </MenuItem>
                        {!isOwn && (
                            [
                                <MenuItem key="like" onClick={() => handleReaction('up')} sx={{ color: reaction === 'up' ? theme.palette.primary.main : 'inherit' }}>
                                    <ThumbUpAltOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
                                    Like
                                </MenuItem>,
                                <MenuItem key="dislike" onClick={() => handleReaction('down')} sx={{ color: reaction === 'down' ? theme.palette.primary.main : 'inherit' }}>
                                    <ThumbDownAltOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
                                    Dislike
                                </MenuItem>
                            ]
                        )}
                    </Menu>
                </Box>
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
                        pr: '24px',
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
                {reaction && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -8,
                            left: 10,
                            bgcolor: 'white',
                            borderRadius: '10px',
                            p: '2px 4px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    >
                        {reaction === 'up' ? (
                            <ThumbUpAltIcon sx={{ fontSize: 12, color: 'primary.main' }} />
                        ) : (
                            <ThumbDownAltOutlinedIcon sx={{ fontSize: 12, color: 'error.main' }} />
                        )}
                    </Box>
                )}
            </Paper>
        </Box>
    )
}

export default ChatMessage;