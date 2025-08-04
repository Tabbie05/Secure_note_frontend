import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ParameterForm from "./ParameterForm";
import AddIcon from "@mui/icons-material/Add";
import { textinfo } from "../constants";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

function Main() {
  const [toggleinfo, settoggleinfo] = useState(false);
  const [toggleform, settoggleform] = useState(false);
  const [toggleaddfunc, settoggleaddfunc] = useState(false);

  const navigate = useNavigate();

  const handleClickInfo = () => settoggleinfo((prev) => !prev);
  const handleShowForm = () => settoggleform((prev) => !prev);
  const handletoggleadd = () => settoggleaddfunc((prev) => !prev);
  const handleRouteView = () => navigate("/viewnoteslink");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#c2bfbfff",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "100%",
          maxWidth: toggleaddfunc ? 900 : 800,
          px: 2,
          transition: "all 0.3s ease",
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
                },
              }}
            >
              <QuestionMarkIcon />
            </Button>

            <Button
              variant="outlined"
              onClick={handletoggleadd}
              sx={{
                backgroundColor: "#fff",
                borderColor: "black",
                color: "black",
                fontSize: "1.25rem",
                fontWeight: "bold",

                px: 2,
                "&:hover": {
                  borderColor: "black",
                },
              }}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>

        {toggleinfo && (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#fff8e1",
              borderRadius: 2,
              p: 2,
              mt: 1,
              width: "100%",
              maxWidth: toggleaddfunc ? 900 : 770,
              overflowY: "auto",
              maxHeight: 220,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="body2" sx={{ mb: 0.8 }}>
              {textinfo}
            </Typography>
          </Paper>
        )}

        {/* TextArea + Side Buttons */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 2,
            mt: 1,
            alignItems: "flex-start",
          }}
        >
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
              },
            }}
          />

          {toggleaddfunc && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: "6px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderColor: "black",
                  color: "black",
                  fontSize: "1.5rem",
                  "&:hover": {
                    borderColor: "black",
                  },
                }}
              >
                😊
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  borderColor: "black",
                  color: "black",
                  fontSize: "1.5rem",
                  "&:hover": {
                    borderColor: "black",
                  },
                }}
              >
                ✏️
              </Button>
            </Box>
          )}
        </Box>

        {/* Parameter Form */}
        {toggleform && (
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 2,
              mt: 1,
              width: "100%",
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
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
            mt: 2,
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
              "&:hover": {
                backgroundColor: "#252525ff",
              },
              px: 3,
              py: 1.5,
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
              px: 3,
              py: 1.5,
              "&:hover": {
                borderColor: "black",
              },
            }}
          >
            {toggleform ? "Disable Options" : "Show Parameters"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
