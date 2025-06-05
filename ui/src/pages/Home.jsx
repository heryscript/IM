import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}


      {/* Banner Section */}
      <Box
        sx={{
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>
            Bienvenue sur notre plateforme Youdentity
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Créez un compte ou connectez-vous pour commencer
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button variant="contained" onClick={() => navigate('/register')}>Inscription</Button>
            <Button variant="outlined" onClick={() => navigate('/login')}>Connexion</Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
