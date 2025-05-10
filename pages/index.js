import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../components/Header';
import LandingContent from '../components/LandingContent';
import Footer from '../components/Footer';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#d32f2f' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>ClubMate - Padel Sports Booking</title>
        <meta name="description" content="Book padel courts, buy pro gear, and join the ClubMate community in Pakistan." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LandingContent />
      <Footer />
    </ThemeProvider>
  );
}