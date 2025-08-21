import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function NoteView() {
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
          elevation={3}
          sx={{
            p: 3,
            minHeight: "350px",
            borderRadius: 2,

            fontStyle: "italic",
            textAlign: "left",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          Sample note content goes here...
        </Paper>
      </Box>
    </Box>
  );
}

export default NoteView;
