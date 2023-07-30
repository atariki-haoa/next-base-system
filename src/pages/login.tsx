import React, { FormEvent, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardContent, CardMedia, Container, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useAuth } from '../context/auth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const response = await axios.post('/api/auth', { email, password })
    if (response.status === 200) {
      login(response.data);
      router.push('/dashboard/home')
    } else {
      console.log(response.data)
    }
  }

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
            height="240"
            image="./images/logo.png"
            alt="logo"
          />
          <CardContent>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
  )
}

export default LoginPage
