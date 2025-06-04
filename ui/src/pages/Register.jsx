import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const authRequest = { name, email, password}
    AuthService.register(authRequest)
      .then(res => {
        navigate('/verify-email');
      })
      .catch(err => {
        console.error('Erreur inscription', err);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleRegister} sx={{ boxShadow: 3, p: 8, bgcolor: 'white', mt: 8 }}>
        <Typography variant="h5" gutterBottom>Formulaire d'inscription</Typography>
        <TextField
          size='small'
          margin="normal"
          fullWidth
          label="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          S'inscrire
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
