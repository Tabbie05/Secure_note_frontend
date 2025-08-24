import React, { useState, useRef, useEffect } from "react"; // <-- Added useRef
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { copytextnote } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function View() {
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false); // <-- initialize as false
  const location = useLocation();
  const link = location.state?.link;
  const destroyAfter = location.state?.destroyAfter;
  const inputRef = useRef(null); // <-- useRef imported and defined
  const navigate = useNavigate()
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          setCopied(true); // <-- use setCopied with capital C
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClickInfo = () => {
    setShowInfo((prev) => !prev);
  };

  const destroyNote = async () => {
    const id = link?.split("/").pop(); // gets '6c8d219aa5bc' from the link

    if (!id) return;
    try {
      const response = axios.put("http://localhost:3000/api/notes/", {
        id: id,
      });
      console.log("note destroyed! id:", id);
      alert("Note destroyed successfully!");
      navigate('/')
    
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "90vh",
        backgroundColor: "#c2bfbfff",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          px: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            The Link to the Note is Ready
          </Typography>

          <Button
            variant="outlined"
            onClick={handleClickInfo}
            sx={{
              minWidth: "40px",
              width: "70px",
              height: "50px",
              padding: 2,
              backgroundColor: "#fff",
              borderColor: "black",
              color: "black",
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              ?
            </Typography>
          </Button>
        </Stack>

        {showInfo && (
          <Paper
            elevation={3}
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "#fffde7", // soft yellow
              borderLeft: "5px solid #ffc107",
              fontSize: "1rem",
            }}
          >
            {copytextnote}
          </Paper>
        )}

        <TextField
          fullWidth
          variant="outlined"
          disabled
          id="outlined-disabled"
          value={link || ""}
          inputRef={inputRef}
          InputProps={{
            sx: {
              fontSize: "1.2rem",
              fontWeight: 500,
              color: "#2C3E50",
              bgcolor: "#ffffff",
              borderRadius: 2,
              boxShadow: 3,
              px: 2,
            },
          }}
          sx={{
            mt: 2,
            width: 770,
            borderRadius: 2,
          }}
        />

        <Paper
          elevation={4}
          sx={{
            mt: 2,
            p: 2,
            fontStyle: "italic",
            fontSize: "1rem",
            backgroundColor: "#fff8e1",
          }}
        >
          The note will self-destruct : {destroyAfter}
        </Paper>

        <Box sx={{ width: "100%", mt: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleCopy}
                sx={{
                  bgcolor: copied ? "#2a9aadff" : "gray",
                  color: "white",
                  border: "black",
                  "&:hover": {
                    borderColor: "gray",
                    bgcolor: copied ? "#2a9aadff" : "#4d4d4d",
                  },
                }}
              >
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "gray",
                  color: "white",
                  border: "black",
                  "&:hover": {
                    bgcolor: "#4d4d4d",
                    borderColor: "gray",
                  },
                }}
              >
                Email
              </Button>
            </Box>

            <Button variant="contained" onClick={destroyNote} >Destroy the Note now</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default View;
