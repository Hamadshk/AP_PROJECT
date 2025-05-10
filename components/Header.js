import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

export default function Header() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Booking', href: '/booking' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin Login', href: '/admin/login' },
  ];

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
                sx={{ mx: 1, textTransform: 'none' }}
              >
                {link.name}
              </Button>
            ))}
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
}