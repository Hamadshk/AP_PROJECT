import { Box, Container, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#1a1b41', color: 'white', py: 4 }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          © 2025 ClubMate. All rights reserved.
        </Typography>
        <Box>
          <IconButton color="inherit" href="https://facebook.com" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com" aria-label="Instagram">
            <Instagram />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com" aria-label="Twitter">
            <Twitter />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}