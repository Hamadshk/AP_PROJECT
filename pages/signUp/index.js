import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Link as MuiLink,
    Paper,
} from '@mui/material';
import NextLink from 'next/link';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
        } else {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError(result.error);
            } else {
                router.push('/');
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h1"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Sign Up
                    </Typography>
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            align="center"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Typography>
                    )}
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            id="name"
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            autoComplete="name"
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            autoComplete="email"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            autoComplete="new-password"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ py: 1.5 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <NextLink href="/signIn" passHref>
                            <MuiLink underline="hover" color="primary">
                                Sign In
                            </MuiLink>
                        </NextLink>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}