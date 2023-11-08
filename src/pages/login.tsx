import React, { FormEvent, useState } from 'react';
import {
  Box, Button, Card, CardContent, CardMedia, Container, TextField, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

import { localApi } from '@/utils/axios';
import { useAuth } from '@/context/auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await localApi.post('/login', { username, password });
      login(response.data);
      router.push('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Card>
          <CardMedia
            component="img"
            image="./images/logo.png"
            alt="logo"
          />
          <CardContent>
            <Typography component="h1" variant="h5">
              Ingresar a plataforma
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
