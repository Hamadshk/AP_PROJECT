import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSession, getSession } from "next-auth/react";
// Import futuristic font
import '@fontsource/orbitron/700.css';

// Styled component for the background with image and gradient
const Background = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `
    linear-gradient(rgba(26, 27, 65, 0.7), rgba(60, 47, 95, 0.7)),
    url(/padel.jpg)
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  animation: 'zoomIn 30s ease-in-out infinite alternate',
  zIndex: 0,
  '@keyframes zoomIn': {
    '0%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(1.05)',
    },
  },
  // Subtle overlay for depth
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.5) 100%)',
    opacity: 0.3,
  },
}));

// Styled component for the main content area
const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'calc(100vh - 64px - 120px)',
  marginTop: '64px',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  backgroundColor: 'transparent',
  overflow: 'hidden',
}));

// Styled component for the booking card with glassmorphism
const BookingCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: 700,
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

// Styled component for futuristic typography
const FuturisticTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Orbitron", sans-serif',
  color: '#fff',
  textShadow: '0 0 8px rgba(0, 229, 255, 0.8), 0 0 16px rgba(0, 229, 255, 0.4)',
  letterSpacing: '1.5px',
}));

// Styled component for slot buttons
const SlotButton = styled(Button)(({ theme, selected }) => ({
  fontFamily: '"Orbitron", sans-serif',
  background: selected
    ? 'linear-gradient(45deg, #00e5ff, #007bff)'
    : 'linear-gradient(45deg, #2a4066, #3c2f5f)',
  color: '#fff',
  border: '1px solid rgba(0, 229, 255, 0.5)',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  textTransform: 'none',
  boxShadow: selected
    ? '0 0 12px rgba(0, 229, 255, 0.8)'
    : '0 0 8px rgba(0, 229, 255, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00e5ff, #007bff)',
    boxShadow: '0 0 16px rgba(0, 229, 255, 1)',
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.5)',
    boxShadow: 'none',
  },
}));

const ConfirmButton = styled(Button)(({ theme }) => ({
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
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'rgba(255, 255, 255, 0.5)',
    boxShadow: 'none',
  },
}));

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      setError(null);
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await fetch(`/api/slots?date=${formattedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch slots');
        }
        const slots = await response.json();
        setAvailableSlots(slots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
  
    setLoading(true);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: formattedDate,
        slot: selectedSlot,
        userId: session.user.id,
      }),
    });
  
    const data = await response.json();
    alert(`Booking confirmed for ${format(selectedDate, 'PP')} at ${selectedSlot}`);
    setSelectedSlot(null);
  
    const slotsResponse = await fetch(`/api/slots?date=${formattedDate}`);
    const slots = await slotsResponse.json();
    setAvailableSlots(slots);
  
    setLoading(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Header sx={{ zIndex: 2, backgroundColor: '#1a1b41' }} />
      <ContentWrapper>
        <Background />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <BookingCard>
            <CardContent>
              <FuturisticTypography variant="h4" component="h1" gutterBottom align="center">
                Book Your Court
              </FuturisticTypography>
              <Box sx={{ mb: 4 }}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
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
                  )}
                />
              </Box>
              <FuturisticTypography variant="h6" component="h2" gutterBottom>
                Available Slots for {format(selectedDate, 'PP')}
              </FuturisticTypography>
              {loading && (
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <CircularProgress sx={{ color: '#00e5ff' }} />
                  <FuturisticTypography variant="body2" sx={{ mt: 1 }}>
                    Scanning slots...
                  </FuturisticTypography>
                </Box>
              )}
              {error && (
                <FuturisticTypography color="error" sx={{ textShadow: 'none' }}>
                  {error}
                </FuturisticTypography>
              )}
              {!loading && !error && availableSlots.length === 0 && (
                <FuturisticTypography sx={{ textShadow: 'none' }}>
                  No slots available
                </FuturisticTypography>
              )}
              <Grid container spacing={2}>
                {availableSlots.map((slot) => (
                  <Grid item xs={6} sm={4} key={slot}>
                    <SlotButton
                      selected={selectedSlot === slot}
                      onClick={() => handleSlotSelect(slot)}
                      fullWidth
                      disabled={loading}
                    >
                      {slot}
                    </SlotButton>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <ConfirmButton
                  size="large"
                  onClick={handleBooking}
                  disabled={!selectedSlot || loading}
                >
                  Confirm Booking
                </ConfirmButton>
              </Box>
            </CardContent>
          </BookingCard>
        </Container>
      </ContentWrapper>
      <Footer sx={{ zIndex: 2, backgroundColor: '#1a1b41' }} />
    </LocalizationProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }
  return { props: {} };
}