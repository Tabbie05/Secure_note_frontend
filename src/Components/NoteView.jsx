import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import AfterView from "./AfterView";

function NoteView() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [hasShownNote, setHasShownNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/notes/${id}`)
      .then((res) => {
        const note = res.data.data;
        setContent(note.content);
        setIsDestroyed(note.destroy === true);
        setHasShownNote(true);
      })
      .catch((err) => {
        if (err.response && err.response.status === 410) {
          setIsDestroyed(true);
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (isDestroyed && !hasShownNote) {
    return <AfterView />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        backgroundColor: "#c2bfbfff",
        display: "flex",
        justifyContent: "center",
        p: 3,
        pt: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          📝 Contents of the Note.
        </Typography>

        <Paper
          elevation={15}
          sx={{
            p: 3,
            minHeight: "350px",
            borderRadius: 2,
            fontSize: 25,
            fontStyle: "italic",
            textAlign: "left",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {content}
        </Paper>

        <Button
          variant="outlined"
          onClick={handleCopy}
          sx={{
            bgcolor: copied ? "#2a9aadff" : "gray",
            color: "white",
            border: "black",
            mt: 2,
            width: 120,
            "&:hover": {
              borderColor: "gray",
              bgcolor: copied ? "#2a9aadff" : "#4d4d4d",
            },
          }}
        >
          {copied ? "Copied!" : "Copy Text"}
        </Button>
      </Box>
    </Box>
  );
}

export default NoteView;
