import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { textinfo } from "../constants";
import ParameterForm from './ParameterForm'
import { useNavigate } from "react-router-dom";


function Main() {
  const [toggleinfo, settoggleinfo] = useState(false);
  const [toggleform, settoggleform] = useState(false);
  
  const navigate = useNavigate()
  const handleClickInfo = () => {
    settoggleinfo((prev) => !prev);
  };
  const handleShowForm = () => {
    settoggleform((prev)=>!prev)
  };
  const handleRouteView = () => {
    navigate("/viewnoteslink")
  }

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#c2bfbfff",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
          maxWidth: 800,
          px: 2,
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            New Note
          </Typography>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#ffffffff",
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
              },
            }}
            onClick={handleClickInfo}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              ?
            </Typography>
          </Button>
        </Box>

        {/* Info Box */}
        {toggleinfo && (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#fff8e1", // soft yellow
              borderRadius: 2,
              p: 2,
              mt: 1,
              width: "100%",
              maxWidth: 800,
              maxHeight: 220,
              overflowY: "auto",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: 6,
              },
            }}
          >
            {textinfo.split("\n").map((line, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 0.8 }}>
                {line}
              </Typography>
            ))}
          </Paper>
        )}

        {/* TextField */}
        <TextField
          id="secure-note-input"
          placeholder="Enter your secure note..."
          multiline
          variant="filled"
          rows={12}
          sx={{
            width: "100%",
            backgroundColor: "#ffffffff",
            borderRadius: 2,
            boxShadow: 4,
            input: {
              color: "#2C3E50",
            },
            "& .MuiFilledInput-root": {
              fontSize: "1.25rem",
            },
          }}
        />
        

        {toggleform &&  <ParameterForm/>}

        {/* Bottom Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#43464bff",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#252525ff",
              },
              boxShadow: "none",
            }}
            onClick={handleRouteView}
          >
            <Typography variant="h6">Create Note</Typography>
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: "black",
              backgroundColor: "#ffffffff",
              color: "black",
              "&:hover": {
                borderColor: "black",
              },
            }}
            onClick={handleShowForm}
          >
            <Typography variant="h6">{toggleform ? "Disable Options" : "Show Parameters"}</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
