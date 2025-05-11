// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'rgba(13, 17, 23, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #58a6ff',
        boxShadow: '0 0 20px #0ff',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: '#58a6ff',
            fontWeight: 'bold',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: 1,
            textShadow: '0 0 8px #0ff',
            '&:hover': {
              color: '#0ff',
            },
          }}
        >
          🎥 CineVault
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            sx={navButtonStyle}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/favorites"
            sx={navButtonStyle}
          >
            Favorites
          </Button>
        
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Neon button style
const navButtonStyle = {
  color: 'white',
  border: '1px solidrgb(225, 229, 234)',
  borderRadius: '20px',
  fontWeight: 'bold',
  fontFamily: 'Orbitron, sans-serif',
  textTransform: 'none',
  px: 2,
  '&:hover': {
    color: '#0ff',
    borderColor: '#0ff',
    boxShadow: '0 0 10px #0ff',
  },
};

export default Header;
