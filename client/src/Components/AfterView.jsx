import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function AfterView() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        backgroundColor: "#c2bfbfff",
        display: "flex",
        justifyContent: "center",
        //alignItems: "center", // vertically center content
        p: 3,
       
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          //textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            
            color: "#333",
          }}
        >
          📝 Note is Clear!
        </Typography>

        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
            fontSize: 18,
            
            //lineHeight: 1.6,
            color: "#444",
          }}
        >
          The note with ID <strong>af4ttaVo</strong> was read and has been
          safely destroyed. <br /><br />
          If <strong>you didn’t read</strong> this note, someone else might have
          accessed it. <br /><br />
          If <strong>you read it</strong> but forgot the contents, ask the sender
          to share a new note. 
        </Paper>
      </Box>
    </Box>
  );
}

export default AfterView;
