import React from 'react';
import { Box, TextField } from '@mui/material';

function Main() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#969292ff', // secure, dark background
        padding: 2,
        
      }}
    >
      <TextField
        id="secure-note-input"
        placeholder="Enter your secure note..."
        multiline
        variant="filled"
        rows={18}
        sx={{
          width: '80%',
          maxWidth: 900,
          bgcolor: '#FFFFFF', // white textarea on dark bg
          borderRadius: 2,
          boxShadow: 4,
          input: { color: '#2C3E50' },
          '& .MuiFilledInput-root': {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </Box>
  );
}

export default Main;
