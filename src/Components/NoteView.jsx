import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, TextField, CircularProgress, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import AfterView from "./AfterView";
import { API_BASE_URL } from "../constants";

function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [hasShownNote, setHasShownNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null); // Added error state
  
  // Password protection states
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleCopy = () => {
    // Mobile-safe clipboard handling
    if (!navigator.clipboard) {
      // Fallback for older mobile browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
      document.body.removeChild(textArea);
      return;
    }

    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error('Clipboard error:', err);
    });
  };

  const fetchNote = async () => {
    console.log("API IS CALLING");
    
    try {
      // Clear any previous errors
      setError(null);
      
      // Check if API_BASE_URL is defined
      if (!API_BASE_URL) {
        throw new Error("API configuration missing");
      }

      console.log("Fetching from:", `${API_BASE_URL}/notes/${id}`);
      
      const response = await axios.get(`${API_BASE_URL}/notes/${id}`, {
        timeout: 15000, // 15 seconds for mobile networks
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("API Response received:", response.status);
      
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }
      
      const noteData = response.data.data;
      console.log("Note data received:", noteData);
      
      setNote(noteData);
      
      // Enhanced password protection check
      const hasPasswordProtection = Boolean(noteData.hasPassword) && 
        noteData.hasPassword !== 'false' && 
        noteData.hasPassword !== '0' && 
        noteData.hasPassword !== 0 && 
        noteData.hasPassword !== false;

      console.log('Password protection:', hasPasswordProtection);

      if (hasPasswordProtection) {
        setIsPasswordProtected(true);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setContent(noteData.content || '');
        setIsDestroyed(noteData.destroy === true);
        setHasShownNote(true);
      }
      
    } catch (err) {
      console.error('Error fetching note:', err);
      
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 410) {
          setIsDestroyed(true);
          return;
        } else {
          setError(`Server Error (${err.response.status}): ${err.response.data?.message || 'Failed to load note'}`);
        }
      } else if (err.request) {
        // Network error
        setError(`Network Error: Cannot connect to server. Please check your internet connection.`);
      } else if (err.code === 'ECONNABORTED') {
        // Timeout
        setError('Request timeout. Please try again with a better connection.');
      } else {
        // Other errors
        setError(err.message || 'Failed to load note. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyPassword = async () => {
    if (!passwordInput.trim()) {
      setPasswordError('Please enter a password');
      return;
    }

    try {
      setIsVerifying(true);
      setPasswordError('');
      
      const response = await axios.post(
        `${API_BASE_URL}/notes/${id}/verify-password`,
        { password: passwordInput },
        { timeout: 10000 }
      );

      if (response.data && response.data.success) {
        const noteData = response.data.data;
        setIsAuthenticated(true);
        setContent(noteData.content || '');
        setNote(noteData);
        setIsDestroyed(noteData.destroy === true);
        setHasShownNote(true);
        setPasswordInput('');
      } else {
        setPasswordError('Invalid response from server');
      }
    } catch (err) {
      console.error('Error verifying password:', err);
      if (err.response && err.response.status === 401) {
        setPasswordError('Incorrect password. Please try again.');
      } else if (err.response && err.response.status === 410) {
        setIsDestroyed(true);
      } else {
        setPasswordError('Error verifying password. Please try again.');
      }
      setPasswordInput('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    verifyPassword();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyPassword();
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with ID:", id);
    console.log("API_BASE_URL:", API_BASE_URL);
    
    if (!id) {
      setError("No note ID provided in URL");
      setLoading(false);
      return;
    }
    
    fetchNote();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundColor: "#c2bfbfff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading note...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state - CRITICAL for mobile
  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundColor: "#c2bfbfff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={15}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '100%',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontSize: '3rem' }}>
            ⚠️
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Error Loading Note
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', fontSize: '0.9rem' }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchNote();
            }}
            sx={{
              bgcolor: '#2a9aadff',
              mb: 2,
              '&:hover': {
                bgcolor: '#238a9c',
              },
            }}
          >
            Try Again
          </Button>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            API: {API_BASE_URL || 'Not configured'}
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Destroyed note state
  if (isDestroyed && !hasShownNote) {
    return <AfterView />;
  }

  // Password prompt screen
  if (isPasswordProtected && !isAuthenticated) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundColor: "#c2bfbfff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={15}
          sx={{
            p: 4,
            maxWidth: 400,
            width: '100%',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontSize: '3rem' }}>
            🔒
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Password Protected Note
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            This note is password protected. Enter the password to view its contents.
          </Typography>

          <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mb: 2 }}>
            <TextField
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter password"
              fullWidth
              variant="outlined"
              disabled={isVerifying}
              autoFocus
              sx={{ mb: 2 }}
            />
            
            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}

            <Button
              type="submit"
              onClick={verifyPassword}
              disabled={isVerifying || !passwordInput.trim()}
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1rem',
                bgcolor: '#2a9aadff',
                '&:hover': {
                  bgcolor: '#238a9c',
                },
              }}
            >
              {isVerifying ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Verifying...
                </>
              ) : (
                'Unlock Note'
              )}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Don't have the password? Contact the note creator.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Main note display (only shown when authenticated)
  if (isAuthenticated && hasShownNote) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundColor: "#c2bfbfff",
          display: "flex",
          justifyContent: "center",
          p: 3,
          pt: 5,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              📝 Contents of the Note.
            </Typography>
            {isPasswordProtected && (
              <Box 
                sx={{
                  bgcolor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                 borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#856404' }}>
                  🔒 Protected
                </Typography>
              </Box>
            )}
          </Box>
          
          <Paper
            elevation={15}
            sx={{
              p: 3,
              minHeight: "350px",
              borderRadius: 2,
              fontSize: 25,
              fontStyle: "italic",
              textAlign: "left",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {content}
          </Paper>
          
          <Button
            variant="outlined"
            onClick={handleCopy}
            sx={{
              bgcolor: copied ? "#2a9aadff" : "gray",
              color: "white",
              border: "black",
              mt: 2,
              width: 120,
              "&:hover": {
                borderColor: "gray",
                bgcolor: copied ? "#2a9aadff" : "#4d4d4d",
              },
            }}
          >
            {copied ? "Copied!" : "Copy Text"}
          </Button>
        </Box>
      </Box>
    );
  }

  return null;
  // Password prompt screen
  if (isPasswordProtected && !isAuthenticated) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundColor: "#c2bfbfff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={15}
          sx={{
            p: 4,
            maxWidth: 400,
            width: '100%',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontSize: '3rem' }}>
            🔒
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Password Protected Note
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            This note is password protected. Enter the password to view its contents.
          </Typography>

          <Box component="div" sx={{ mb: 2 }}>
            <TextField
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter password"
              fullWidth
              variant="outlined"
              disabled={isVerifying}
              autoFocus
              sx={{ mb: 2 }}
            />
            
            {passwordError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {passwordError}
              </Alert>
            )}

            <Button
              onClick={verifyPassword}
              disabled={isVerifying || !passwordInput.trim()}
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1rem',
                bgcolor: '#2a9aadff',
                '&:hover': {
                  bgcolor: '#238a9c',
                },
              }}
            >
              {isVerifying ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Verifying...
                </>
              ) : (
                'Unlock Note'
              )}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Don't have the password? Contact the note creator.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Main note display (only shown when authenticated)
  if (isAuthenticated && hasShownNote) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          backgroundColor: "#c2bfbfff",
          display: "flex",
          justifyContent: "center",
          p: 3,
          pt: 5,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              📝 Contents of the Note.
            </Typography>
            {isPasswordProtected && (
              <Box
                sx={{
                  bgcolor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#856404' }}>
                  🔒 Protected
                </Typography>
              </Box>
            )}
          </Box>
          
          <Paper
            elevation={15}
            sx={{
              p: 3,
              minHeight: "350px",
              borderRadius: 2,
              fontSize: 25,
              fontStyle: "italic",
              textAlign: "left",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {content}
          </Paper>
          
          <Button
            variant="outlined"
            onClick={handleCopy}
            sx={{
              bgcolor: copied ? "#2a9aadff" : "gray",
              color: "white",
              border: "black",
              mt: 2,
              width: 120,
              "&:hover": {
                borderColor: "gray",
                bgcolor: copied ? "#2a9aadff" : "#4d4d4d",
              },
            }}
          >
            {copied ? "Copied!" : "Copy Text"}
          </Button>
        </Box>
      </Box>
    );
  }

  // Fallback for any unhandled states
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        backgroundColor: "#c2bfbfff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">
          Unexpected state - please refresh the page
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Refresh
        </Button>
      </Paper>
    </Box>
  );
}

export default NoteView;