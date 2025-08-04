import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { expirationOptions } from "../constants";

function ParameterForm() {
  const [value, setValue] = useState(expirationOptions[0]);
  const [checked, setChecked] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        border: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 3,
        }}
      >
        {/* Select + Checkbox */}
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <FormControl fullWidth>
            <InputLabel id="expiration-label" sx={{ fontWeight: "bold" }}>
              The note will self-destruct
            </InputLabel>
            <Select
              labelId="expiration-label"
              value={value}
              label="The note will self-destruct"
              onChange={(e) => setValue(e.target.value)}
            >
              {expirationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            }
            label="Do not ask for confirmation before showing and destroying the note."
            sx={{ ml: { md: 4 }, width: "100%" }}
          />
        </Stack>

        {/* Secret Password */}
        <Box mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Secret password
          </Typography>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            width="100%"
          >
            <TextField
              fullWidth
              label="Enter the password to decrypt the note"
              type="password"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Repeat password"
              type="password"
              variant="outlined"
            />
          </Stack>
        </Box>

        {/* Destruction Notification */}
        <Box mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Destruction notification
          </Typography>
          <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
            E-mail to receive notification of the destruction of the note.
          </Typography>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            width="100%"
          >
            <TextField
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Note link title (optional)"
              type="text"
              variant="outlined"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default ParameterForm;
