import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { copytextnote } from "../constants"; 
import { useLocation } from "react-router-dom";

function View() {
  const [showInfo, setShowInfo] = useState(false);
  const location = useLocation();
  const link = location.state?.link;

  const handleClickInfo = () => {
    setShowInfo((prev) => !prev);
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
          value={link}
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
          The note will self-destruct after reading it.
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
                Select Link
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

            <Button variant="contained">Destroy the Note now</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default View;
