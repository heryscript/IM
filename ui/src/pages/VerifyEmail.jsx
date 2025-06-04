import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const [notif, setNotif] = useState({
    open: false,
    message:'',
    severity:'success'
  })

  const handleCloseNotif = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotif({ ...notif, open: false });
  };

  const handleVerify = (e) => {
    e.preventDefault();
    AuthService.verifyEmail(token)
      .then(res => {
        setNotif({ open: true, message: 'Verification email terminer avec succès !', severity: 'success' });
        
        // attendre 1.5 seconde avant de rediriger
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch(err => {
        setNotif({ open: true, message: "Une erreur s'est produite lors de la verification de votre email !", severity: 'success' });
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
