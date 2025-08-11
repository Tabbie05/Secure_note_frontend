import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ParameterForm from "./ParameterForm";
import AddIcon from "@mui/icons-material/Add";
import { textinfo } from "../constants";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EmojiPicker from "emoji-picker-react";

function Main() {
  const [toggleinfo, settoggleinfo] = useState(false);
  const [toggleform, settoggleform] = useState(false);
  const [toggleaddfunc, settoggleaddfunc] = useState(false);
  const [toggleemojipicker, settoggleemojipicker] = useState(false);
  const [text, settext] = useState("")

  const navigate = useNavigate();

  const handleClickInfo = () => settoggleinfo((prev) => !prev);
  const handleShowForm = () => settoggleform((prev) => !prev);
  const handletoggleadd = () => settoggleaddfunc((prev) => !prev);
  const handleRouteView = () => navigate("/viewnoteslink");
  const handletoggleEmopicker = () => settoggleemojipicker((prev) => !prev);

  // Handle emoji clicks
  const onEmojiClick = (emojiData, event) => {
    console.log("Emoji clicked:", emojiData);
    settext((prev)=> prev + emojiData.emoji)
    settoggleemojipicker(false); 
  };
  console.log(text)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "90vh",
        backgroundColor: "#c2bfbfff",
        p: 2,
        position: "relative", // For absolute positioning of emoji picker
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
          maxWidth: 800, // Fixed width, no dynamic changes
          px: 2,
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            New Note
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleClickInfo}
              sx={{
                backgroundColor: "#fff",
                borderColor: "black",
                color: "black",
                height: 50,
                fontWeight: "bold",
                fontSize: 18,
                px: 2,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <QuestionMarkIcon />
            </Button>

            <Button
              variant="outlined"
              onClick={handletoggleadd}
              sx={{
                backgroundColor: toggleaddfunc ? "#f0f0f0" : "#fff",
                borderColor: "black",
                color: "black",
                fontSize: "1.25rem",
                fontWeight: "bold",
                height: 50,
                px: 2,
                "&:hover": {
                  borderColor: "black",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>

        {/* Info Panel */}
        {toggleinfo && (
  <Paper
    elevation={3}
    sx={{
      backgroundColor: "#fff8e1",
      borderRadius: 2,
      p: 2,
      mt: 1,
      width: "100%",
      overflowY: "auto",
      maxHeight: 240,
      transition: "all 0.3s ease",
      borderLeft: "5px solid #ffc107", // Yellow line
      "&:hover": {
        transform: "scale(1.01)",
        boxShadow: 6,
      },
    }}
  >
    <Box sx={{ pl: 1 }}>
      <Typography variant="body2" paragraph>
        {textinfo.intro}
      </Typography>

      <ol style={{ paddingLeft: "1.5em", marginTop: 0 }}>
        {textinfo.steps.map((step, index) => (
          <li key={index}>
            <Typography variant="body2">{step}</Typography>
          </li>
        ))}
      </ol>

      <Typography variant="body2" paragraph sx={{ mt: 1 }}>
        {textinfo.outro}
      </Typography>

      <ul style={{ paddingLeft: "1.5em", marginTop: 0 }}>
        {textinfo.options.map((option, index) => (
          <li key={index}>
            <Typography variant="body2">{option}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  </Paper>
)}


        {/* Main Content Area */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            mt: 1,
          }}
        >
          {/* TextArea */}
          <TextField
            multiline
            rows={12}
            variant="filled"
            placeholder="Enter your secure note..."
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 4,
              "& .MuiFilledInput-root": {
                fontSize: "1.25rem",
                color: "#2C3E50",
                borderRadius: 2,
              },
            }}
            value={text}
            onChange={(e)=>settext(e.target.value)}
          />

          {/* Side Action Buttons - Positioned absolutely */}
          {toggleaddfunc && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 5,
              }}
            >
              <Button
                variant="outlined"
                onClick={handletoggleEmopicker}
                sx={{
                  backgroundColor: toggleemojipicker ? "#fff3e0" : "#fff",
                  borderColor: toggleemojipicker ? "#ff9800" : "#ddd",
                  color: "black",
                  fontSize: "1.2rem",
                  minWidth: 44,
                  height: 44,
                  
                  boxShadow: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#ff9800",
                    backgroundColor: "#fff3e0",
                    transform: "scale(1.05)",
                  },
                }}
              >
                😊
              </Button>

              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderColor: "#ddd",
                  color: "black",
                  fontSize: "1.2rem",
                  minWidth: 44,
                  height: 44,
                 
                  boxShadow: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#2196f3",
                    backgroundColor: "#e3f2fd",
                    transform: "scale(1.05)",
                  },
                }}
              >
                ✏️
              </Button>
            </Box>
          )}

          {/* Emoji Picker - Positioned absolutely to not affect layout */}
          {toggleemojipicker && (
            <>
              {/* Backdrop to close picker when clicking outside */}
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 998,
                }}
                onClick={() => settoggleemojipicker(false)}
              />
              
              {/* Emoji Picker */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 60, // Position next to the buttons
                  zIndex: 999,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                  "& .epr-emoji-category-label": {
                    backgroundColor: "#f5f5f5 !important",
                    fontSize: "0.9rem !important",
                    fontWeight: "600 !important",
                  },
                  "& .epr-emoji-list": {
                    maxHeight: "300px !important",
                  },
                  "& .epr-body": {
                    backgroundColor: "white !important",
                  },
                  "& .epr-header": {
                    backgroundColor: "#f8f9fa !important",
                    borderBottom: "1px solid #e0e0e0 !important",
                  },
                  "& .epr-search": {
                    backgroundColor: "white !important",
                  },
                }}
              >
                <EmojiPicker 
                  onEmojiClick={onEmojiClick}
                  width={320}
                  height={400}
                  searchDisabled={false}
                  skinTonesDisabled={false}
                  previewConfig={{
                    showPreview: false
                  }}
                />
              </Box>
            </>
          )}
        </Box>

        {/* Parameter Form */}
        {toggleform && (
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 2,
              mt: 2,
              width: "100%",
              boxShadow: 3,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "600" }}>
              Parameters
            </Typography>
            <ParameterForm />
          </Box>
        )}

        {/* Bottom Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 3,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleRouteView}
            sx={{
              backgroundColor: "#43464bff",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 18,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              boxShadow: 3,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#252525ff",
                boxShadow: 6,
                transform: "translateY(-1px)",
              },
            }}
          >
            Create Note
          </Button>

          <Button
            variant="outlined"
            onClick={handleShowForm}
            sx={{
              backgroundColor: "#fff",
              borderColor: "black",
              color: "black",
              fontWeight: "bold",
              fontSize: 18,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              boxShadow: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f5f5f5",
                boxShadow: 4,
                transform: "translateY(-1px)",
              },
            }}
          >
            {toggleform ? "Hide Parameters" : "Show Parameters"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;