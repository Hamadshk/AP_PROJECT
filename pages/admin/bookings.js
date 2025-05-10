import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Header from '@/components/Header';

export default function ViewBookings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated' && session.user.role === 'admin') {
      fetch('/api/allbookings')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch bookings');
          return res.json();
        })
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [status, session, router]);

  if (status === 'loading' || loading) {
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
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Typography variant="h4" color="white" gutterBottom>
          Booked Slots
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {bookings.length === 0 && !error && (
          <Typography color="white" sx={{ mb: 2 }}>
            No bookings found.
          </Typography>
        )}
        {bookings.length > 0 && (
          <Table sx={{ bgcolor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Slot</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f5f5f5' } }}>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.slot}</TableCell>
                  <TableCell>{booking.userId}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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