import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography, Box } from '@mui/material';
import EnhancedEncryptionSharpIcon from '@mui/icons-material/EnhancedEncryptionSharp';

function Navbar() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2C3E50' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <EnhancedEncryptionSharpIcon sx={{ fontSize: 29, color: '#ECF0F1' }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ECF0F1', letterSpacing: 1 }}>
              SECURE NOTE
            </Typography>
            <Typography variant='sm' sx={{fontSize:15,marginLeft:2,marginBottom:2}}>
                Send anonymous one time notes 
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
