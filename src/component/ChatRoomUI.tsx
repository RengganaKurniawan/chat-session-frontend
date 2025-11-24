import { useState } from "react";
import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Session {
  id: number;
  title: string;
  date: string;
  status: string;
}

interface ChatRoomUIProps {
  session: Session;
  onClose: () => void;
}

export function ChatRoomUI({ session, onClose }: ChatRoomUIProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "you",
      text: "Alice, kita bantu revisi laporan yang lagi?",
      time: "10:02"
    },
    {
      id: 2,
      sender: "Alice",
      text: "Bisa. Bagian mana yang perlu direvisi?",
      time: "10:02"
    },
    {
      id: 3,
      sender: "you",
      text: "Bagian metodologinya. Aku mau lebih singkat dan jelas.",
      time: ""
    },
    {
      id: 4,
      sender: "Alice",
      text: "Oke, aku perbaiki dulu ya.",
      time: "10:03"
    },
    {
      id: 5,
      sender: "you",
      text: "Siap, makasih.",
      time: "10:04"
    },
    {
      id: 6,
      sender: "Alice",
      text: "Sudah aku revisi. Sekarang ringkasannya lebih padat dan langsung ke inti.",
      time: "10:34"
    },
    {
      id: 7,
      sender: "you",
      text: "Oke, ini jauh lebih bagus. Thanks Alice.",
      time: ""
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "you",
      text: inputText,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "you",
      text: `📎 ${file.name}`,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages([...messages, newMessage]);
    setShowUploadMenu(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "you",
      text: `🖼️ ${file.name}`,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setMessages([...messages, newMessage]);
    setShowUploadMenu(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.chatBox}>
       
    
          <div style={styles.header}>
            <span style={styles.headerText}>{session.title}</span>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          {/* message */}
          <div style={styles.messagesArea}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.messageRow,
                  justifyContent:
                    message.sender === "you" ? "flex-end" : "flex-start"
                }}
              >
                <div style={styles.messageWrapper}>
                  {message.sender !== "you" && (
                    <div style={styles.senderName}>{message.sender}</div>
                  )}

                  <div
                    style={{
                      ...styles.messageBubble,
                      backgroundColor:
                        message.sender === "you" ? "#00bcd4" : "#d5d5d5",
                      color: message.sender === "you" ? "#fff" : "#000"
                    }}
                  >
                    <div style={styles.messageText}>{message.text}</div>
                    {message.time && (
                      <div
                        style={{
                          ...styles.timeStamp,
                          color: message.sender === "you" ? "#fff" : "#666"
                        }}
                      >
                        {message.time}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* INPUT text */}
          <div style={styles.inputArea}>
            <div style={styles.inputContainer}>
              <button
                style={styles.addButton}
                onClick={() => setShowUploadMenu(!showUploadMenu)}
              >
                +
              </button>

              <input
                type="text"
                placeholder="Chat anything"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                style={styles.input}
              />

              <button style={styles.sendButton} onClick={handleSend}>
                ▶
              </button>
            </div>

            {/* upload menu */}
            {showUploadMenu && (
              <div style={styles.uploadMenu}>
                <div 
                  style={styles.menuItem}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span style={styles.menuIcon}>📎</span>
                  <span style={styles.menuText}>upload file</span>
                </div>
                <div 
                  style={styles.menuItem}
                  onClick={() => imageInputRef.current?.click()}
                >
                  <span style={styles.menuIcon}>🖼️</span>
                  <span style={styles.menuText}>upload photo</span>
                </div>
              </div>
            )}

          
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100%"
  } as React.CSSProperties,

  container: {
    height: "100vh",
    flex: 1,
    backgroundColor: "#fafafa",
    margin: 0,
    padding: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
  } as React.CSSProperties,

  chatBox: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column"
  } as React.CSSProperties,

  header: {
    padding: "16px",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  } as React.CSSProperties,

  headerText: {
    fontSize: "16px",
    fontWeight: 600
  } as React.CSSProperties,

  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  } as React.CSSProperties,

  messageRow: {
    display: "flex",
    width: "100%"
  } as React.CSSProperties,

  messageWrapper: {
    maxWidth: "60%",
    minWidth: "150px"
  } as React.CSSProperties,

  senderName: {
    fontSize: "12px",
    color: "#666",
    fontWeight: 600,
    marginBottom: "4px",
    paddingLeft: "4px"
  } as React.CSSProperties,

  messageBubble: {
    padding: "12px",
    borderRadius: "4px",
    position: "relative",
    paddingBottom: "20px"
  } as React.CSSProperties,

  messageText: {
    fontSize: "14px",
    lineHeight: "1.4"
  } as React.CSSProperties,

  timeStamp: {
    position: "absolute",
    bottom: "4px",
    right: "8px",
    fontSize: "11px"
  } as React.CSSProperties,

  inputArea: {
    padding: "16px",
    paddingBottom: "24px",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    position: "relative"
  } as React.CSSProperties,

  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    padding: "8px 12px"
  } as React.CSSProperties,

  addButton: {
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "20px",
    color: "#666",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0"
  } as React.CSSProperties,

  input: {
    flex: 1,
    border: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    outline: "none",
    padding: "8px"
  } as React.CSSProperties,

  sendButton: {
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    color: "#666",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0"
  } as React.CSSProperties,

  uploadMenu: {
    marginTop: "12px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    overflow: "hidden"
  } as React.CSSProperties,

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    transition: "background-color 0.2s"
  } as React.CSSProperties,

  menuIcon: {
    fontSize: "16px"
  } as React.CSSProperties,

  menuText: {
    fontSize: "14px",
    flex: 1
  } as React.CSSProperties,

  closeIcon: {
    fontSize: "14px",
    color: "#666"
  } as React.CSSProperties
};