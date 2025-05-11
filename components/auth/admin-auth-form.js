import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@fontsource/orbitron/700.css';

const AuthCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid rgba(0, 229, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 229, 255, 0.4)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 229, 255, 0.6)',
  },
}));

const FuturisticTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Orbitron", sans-serif',
  color: '#fff',
  textShadow: '0 0 8px rgba(0, 229, 255, 0.8), 0 0 16px rgba(0, 229, 255, 0.4)',
  letterSpacing: '1.5px',
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const AuthButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Orbitron", sans-serif',
  background: 'linear-gradient(45deg, #ff4081, #007bff)',
  color: '#fff',
  borderRadius: '30px',
  padding: theme.spacing(1.5, 4),
  boxShadow: '0 0 12px rgba(255, 64, 129, 0.8)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff4081, #00e5ff)',
    boxShadow: '0 0 20px rgba(255, 64, 129, 1)',
    transform: 'scale(1.1)',
  },
}));

const ErrorTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Orbitron", sans-serif',
  color: '#ff1744',
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

function AdminAuthForm() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    setError(null);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.replace('/admin/dashboard');
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          linear-gradient(rgba(26, 27, 65, 0.7), rgba(60, 47, 95, 0.7)),
          url(/padel.jpg)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AuthCard>
        <CardContent>
          <FuturisticTypography variant="h4">Admin Login</FuturisticTypography>
          <form onSubmit={submitHandler}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                inputRef={emailRef}
                required
                sx={{
                  '& .MuiInputBase-root': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 229, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#fff',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 229, 255, 0.8)',
                    fontFamily: '"Orbitron", sans-serif',
                  },
                  '& .Mui-focused': {
                    borderColor: '#00e5ff',
                    boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
                  },
                }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                inputRef={passwordRef}
                required
                sx={{
                  '& .MuiInputBase-root': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 229, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#fff',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(0, 229, 255, 0.8)',
                    fontFamily: '"Orbitron", sans-serif',
                  },
                  '& .Mui-focused': {
                    borderColor: '#00e5ff',
                    boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
                  },
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <AuthButton type="submit">Login</AuthButton>
            </Box>
            {error && <ErrorTypography>{error}</ErrorTypography>}
          </form>
        </CardContent>
      </AuthCard>
    </Box>
  );
}

export default AdminAuthForm;