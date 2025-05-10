import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#1a1b41' }}>
        <Typography variant="h6" color="white">Loading...</Typography>
      </Box>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null; // Redirect handled by useEffect
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1a1b41' }}>
      <Header />
      <Container maxWidth="sm" sx={{ pt: 4, pb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" color="white" gutterBottom>
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/admin/upload"
          sx={{ mb: 2, width: '200px', textTransform: 'none' }}
        >
          Upload Shop Gears
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/admin/bookings"
          sx={{ width: '200px', textTransform: 'none' }}
        >
          View Bookings
        </Button>
      </Container>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
}