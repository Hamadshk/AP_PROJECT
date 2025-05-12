import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
export default function Header() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Booking', href: '/booking' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'ShowMyBookings', href: '/mybookings' },
    { name: 'Logout', href: '/signIn' },
    { name: 'Dashboard', href: '/admin/dashboard' },
  ];
  const { data: session } = useSession();
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#1a1b41' }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ClubMate
          </Typography>
          <nav>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                color="inherit"
                component={Link}
                href={link.href}
                onClick={link.name === 'Logout' ? () => signOut() : () => { }}
                sx={{ mx: 1, textTransform: 'none' }}
              >
                {link.name}
              </Button>
            ))}
          </nav>
        </Toolbar>
        <div style={{ padding: '5px' }}>{session?.user.email}</div>

      </Container>
    </AppBar>
  );
}