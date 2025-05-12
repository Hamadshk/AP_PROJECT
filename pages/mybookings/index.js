import React from 'react';
import { getSession } from 'next-auth/react';
import { Container, Typography, List, ListItem, Paper, Box, Button } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Mybookings = ({ bookings }) => {
  async function handleDeleteBooking(bookingId) {
    let res = await fetch(`http://localhost:3000/api/mybookings?bookingId=${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.ok) {
      alert('Booking deleted successfully');
      window.location.reload();
    } else {
      alert('Failed to delete booking');
    }

  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensure the container takes at least the full viewport height
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1, // Allow main content to grow and push footer down
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" component="h1" gutterBottom align="center">
            My Bookings
          </Typography>
          {bookings.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              No bookings found.
            </Typography>
          ) : (
            <List>
              {bookings.map((booking) => (
                <ListItem key={booking._id} disablePadding>
                  <Paper
                    elevation={2}
                    sx={{
                      width: '100%',
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      backgroundColor: '#fafafa',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Date: {booking.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Slot: {booking.slot}
                      </Typography>
                    </Box>
                    <Button variant='contained' onClick={() => handleDeleteBooking(booking._id)}>Delete</Button>

                  </Paper>
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Mybookings;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  const userId = session.user.id;
  const response = await fetch(`http://localhost:3000/api/mybookings?userId=${userId}`, {
    method: 'GET',
    headers: {},
  });

  const bookings = await response.json();

  return { props: { bookings } };
}