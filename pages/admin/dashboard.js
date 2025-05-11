import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import Link from 'next/link';
import { RemoveCircleOutlineRounded } from '@mui/icons-material';

export default function AdminDashboard() {


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
  console.log(session);
  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }
  return { props: {} };
}