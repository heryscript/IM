import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    AuthService.verifyEmail(token)
      .then(res => {
        navigate('/login');
      })
      .catch(err => {
        console.error('Erreur vérification', err);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleVerify} sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Vérification de l'email</Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Token de vérification"
          value={token}
          onChange={e => setToken(e.target.value)}
          required
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Vérifier
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
