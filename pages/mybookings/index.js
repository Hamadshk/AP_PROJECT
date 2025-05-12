import React from 'react';
import { getSession } from 'next-auth/react';
import { Container, Typography, List, ListItem, Paper, Box } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Mybookings = ({ bookings }) => {
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
        destination: '/login',
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