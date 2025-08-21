import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function NoteView() {
  const [content, setcontent] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const data = axios
      .get(`http://localhost:3000/api/notes/${id}`)
      .then((res) => setcontent(res.data.data.content))
      .catch((err) => console.log(err));
  }, []);
  console.log(content);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        backgroundColor: "#c2bfbfff",
        display: "flex",
        justifyContent: "center",
        p: 3,
        pt: 5, // adds space below Navbar
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
          Contents of the Note.
        </Typography>

        <Box sx={{ backgroundColor: "#ffde71ff", p: 2, borderRadius: 2 }}>
          <Typography>
            This note has been deleted. If you need to save the text, copy it
            before closing this window.
          </Typography>
        </Box>

        <Paper
          elevation={15}
          sx={{
            p: 3,
            minHeight: "350px",
            borderRadius: 2,
            fontSize:25,
            fontStyle: "italic",
            textAlign: "left",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {content}
        </Paper>
      </Box>
    </Box>
  );
}

export default NoteView;
