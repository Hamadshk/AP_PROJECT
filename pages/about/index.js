import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { CheckCircle, SportsHandball, EmojiEvents, Groups, AccessTime } from '@mui/icons-material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#d32f2f' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// Team members data
const teamMembers = [
  {
    name: 'Ahmed Khan',
    role: 'Founder & CEO',
    image: '/team/ahmed.jpg',
    bio: 'Professional padel player with over 10 years of experience. Founded ClubMate to bring world-class padel facilities to Pakistan.'
  },
  {
    name: 'Sara Ali',
    role: 'Operations Manager',
    image: '/team/sara.jpg',
    bio: 'Former national tennis player with expertise in sports management. Ensures smooth day-to-day operations at all our facilities.'
  },
  {
    name: 'Imran Malik',
    role: 'Head Coach',
    image: '/team/imran.jpg',
    bio: 'Certified padel coach with international training experience. Leads our coaching program for players of all skill levels.'
  },
  {
    name: 'Ayesha Nasir',
    role: 'Marketing Director',
    image: '/team/ayesha.jpg',
    bio: 'Marketing specialist with a passion for sports. Drives our community engagement and growth strategies.'
  }
];

export default function AboutUs() {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>About Us - ClubMate</title>
        <meta name="description" content="Learn about ClubMate - Pakistan's premier padel club offering world-class courts and coaching." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      {/* Background image with parallax effect */}
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundImage: 'url(/padel-court.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 10, 0.7)', // Darkened overlay
          }
        }}
      />
      
      {/* Hero Section */}
      <Box sx={{ pt: 15, pb: 8, position: 'relative' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ 
            fontWeight: 'bold', 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            About ClubMate
          </Typography>
          <Typography variant="h6" component="p" align="center" sx={{ 
            mb: 2, 
            maxWidth: 700, 
            mx: 'auto',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Pakistan's premier destination for padel enthusiasts, providing world-class facilities and an exceptional playing experience.
          </Typography>
        </Container>
      </Box>
      
      {/* Our Story Section */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 8 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '100%',
          }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ 
                  color: '#1a1b41', 
                  fontWeight: 'bold',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 3,
                    backgroundColor: 'primary.main',
                  },
                }}>
                  Our Story
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ mt: 4 }}>
                  ClubMate was founded in 2021 with a simple mission: to introduce and promote the exciting sport of padel in Pakistan. What started as a passion project with a single court has quickly grown into the country's leading padel facility.
                </Typography>
                
                <Typography variant="body1" paragraph>
                  Our founder, Ahmed Khan, first discovered padel during his travels in Spain and immediately fell in love with the sport. Seeing its potential to thrive in Pakistan, he brought this exciting hybrid of tennis and squash back home.
                </Typography>
                
                <Typography variant="body1" paragraph>
                  Today, ClubMate operates multiple state-of-the-art courts in Lahore, offering both recreational play and professional coaching. We've built a vibrant community of padel enthusiasts and continue to introduce more people to this addictive sport every day.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box 
                  component="img"
                  src="/about/club-story.jpg"
                  alt="ClubMate Facility"
                  sx={{ 
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      
      {/* Mission and Values Section */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 8 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: '#1a1b41',
            color: 'white',
            maxWidth: '100%',
          }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
              fontWeight: 'bold',
              mb: 5,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 3,
                backgroundColor: 'white',
              },
            }}>
              Our Mission & Values
            </Typography>
            
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmojiEvents sx={{ mr: 2, fontSize: 28 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                    Our Mission
                  </Typography>
                </Box>
                
                <Typography variant="body1" paragraph>
                  To create an inclusive community where padel enthusiasts of all skill levels can enjoy world-class facilities, expert coaching, and a welcoming atmosphere. We aim to grow the sport of padel across Pakistan while providing exceptional experiences for every player who steps onto our courts.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Groups sx={{ mr: 2, fontSize: 28 }} />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                    Our Values
                  </Typography>
                </Box>
                
                <List>
                  {[
                    'Excellence in every aspect of our facilities and service',
                    'Inclusivity for players of all ages, backgrounds, and skill levels',
                    'Community building through tournaments, events, and social play',
                    'Innovation in our coaching methods and court technology',
                    'Passion for padel and its positive impact on health and wellbeing'
                  ].map((value, index) => (
                    <ListItem key={index} sx={{ py: 1, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle fontSize="small" sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      
      {/* Our Facilities Section */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 8 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '100%',
          }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
              color: '#1a1b41', 
              fontWeight: 'bold',
              mb: 5,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              },
            }}>
              Our Facilities
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/about/courts.jpg"
                    alt="Professional Padel Courts"
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Professional Courts
                    </Typography>
                    <Typography variant="body2">
                      Six world-class padel courts built to international specifications with premium glass walls, artificial turf, and professional lighting.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/about/coaching.jpg"
                    alt="Professional Coaching"
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Expert Coaching
                    </Typography>
                    <Typography variant="body2">
                      Certified coaches offering personalized training programs for beginners, intermediate, and advanced players of all ages.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/about/lounge.jpg"
                    alt="Player Lounge"
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Player Lounge
                    </Typography>
                    <Typography variant="body2">
                      Comfortable lounge area with refreshments, viewing area, and free Wi-Fi for players and spectators to relax between games.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/about/proshop.jpg"
                    alt="Pro Shop"
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Pro Shop
                    </Typography>
                    <Typography variant="body2">
                      Fully stocked pro shop offering premium padel rackets, balls, accessories, and ClubMate branded merchandise.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
      
      {/* Our Team Section */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 8 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '100%',
          }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ 
              color: '#1a1b41', 
              fontWeight: 'bold',
              mb: 5,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 3,
                backgroundColor: 'primary.main',
              },
            }}>
              Meet Our Team
            </Typography>
            
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="/api/placeholder/400/400" // Using placeholder image since actual images aren't available
                      alt={member.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" gutterBottom>
                        {member.role}
                      </Typography>
                      <Typography variant="body2">
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
      
      {/* Call to Action Section */}
      <Box sx={{ position: 'relative', zIndex: 1, pb: 12 }}>
        <Container maxWidth="lg">
          <Paper elevation={4} sx={{ 
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            backgroundColor: '#1a1b41',
            color: 'white',
            maxWidth: '100%',
            textAlign: 'center'
          }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Ready to Experience Padel at ClubMate?
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
              Whether you're a seasoned player or new to the sport, we invite you to visit our facilities and become part of our growing community. Book a court, sign up for coaching, or join one of our tournaments!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 'bold',
                  backgroundColor: 'white',
                  color: '#1a1b41',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  }
                }}
              >
                Book a Court
              </Button>
              
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2, 
                  fontWeight: 'bold',
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#f5f5f5',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}