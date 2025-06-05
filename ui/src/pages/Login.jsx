import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const authRequest = { email, password}
    AuthService.login(authRequest)
      .then(res => {
        localStorage.setItem('token', res.token); // Stocke le token dans le localStorage
        setErrorMessage('');
        setAlertOpen(false);
        navigate('/dashboard'); // Redirige vers la page d'accueil après connexion
      })
      .catch(err => {
        const message =  err.response?.data?.message || 'Erreur de connexion';
        setErrorMessage(message);
        setAlertOpen(true);
      });
  };

    const handleCloseAlert = (_, reason) => {
      if (reason === 'clickaway') return;
      setAlertOpen(false);
    };

  return (
    <Container maxWidth="xs">
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="error" onClose={handleCloseAlert} sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box component="form" sx={{ boxShadow: 3, p: 8, bgcolor: 'white', mt: 8 }} onSubmit={handleLogin}>
        <Typography variant="h5" gutterBottom>Formulaire de connexion</Typography>
        <TextField
          size='small'
          margin="normal"
          fullWidth
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          size='small'
          margin="normal"
          fullWidth
          type="password"
          label="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Se connecter
        </Button>
      </Box>

    </Container>
  );
};

export default Login;
