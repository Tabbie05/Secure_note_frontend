import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography, Box } from '@mui/material';

function Navbar() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2C3E50' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <span style={{fontSize:28,mb:1}}>🔒</span>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ECF0F1', letterSpacing: 1 }}>
              SECURE NOTE
            </Typography>
            <Typography variant='body2' sx={{ fontSize: 15, marginLeft: 2, marginBottom: 0.5, color: '#ECF0F1' }}>
              Send anonymous one time notes
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
